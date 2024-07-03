require("dotenv").config();
const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");
const socketIo = require("socket.io");
const MetaApi = require("metaapi.cloud-sdk").default;
const SynchronizationListener =
  require("metaapi.cloud-sdk").SynchronizationListener;

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const apiToken = process.env.NEXT_PUBLIC_META_API_TOKEN;

const metaApi = new MetaApi(apiToken);

class AccountInfoListener extends SynchronizationListener {
  constructor(socket, accountId) {
    super();
    this.socket = socket;
    this.accountId = accountId;
  }

  async onAccountInformationUpdated(instanceIndex, accountInformation) {
    // console.log("Account information updated", accountInformation);
    this.socket.emit("accountInfo", {
      accountId: this.accountId,
      accountInformation: accountInformation,
    });
  }

  async onPositionsUpdated(instanceIndex, positions, removedPositionIds) {
    // console.log("onPositionsUpdated", positions);
    this.socket.emit("positions", {
      accountId: this.accountId,
      positions: positions,
    });
  }

  // Override other methods as needed
  //   async onSymbolPriceUpdated(instanceIndex, price) {
  //     console.log("Symbol price updated", price);
  //   }
  //   async onCandlesUpdated(instanceIndex, candles) {
  //     console.log("Candles updated", candles);
  //   }
  //   async onTicksUpdated(instanceIndex, ticks) {
  //     console.log("Ticks updated", ticks);
  //   }
  //   async onBooksUpdated(instanceIndex, books) {
  //     console.log("Order book updated", books);
  //   }
  //   async onSubscriptionDowngraded(
  //     instanceIndex,
  //     _symbol,
  //     updates,
  //     unsubscriptions
  //   ) {
  //     console.log("Market data subscriptions downgraded due to rate limits");
  //   }
}

app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });

  const io = socketIo(server);

  io.on("connection", (socket) => {
    socket.on("subscribe", async (accountId) => {
      try {
        const account = await metaApi.metatraderAccountApi.getAccount(
          accountId
        );
        const connection = account.getStreamingConnection();

        // Add listener
        const accountInfoListener = new AccountInfoListener(socket, accountId);
        connection.addSynchronizationListener(accountInfoListener);

        await connection.connect();

        // access local copy of terminal state
        const terminalState = connection.terminalState;

        // wait until synchronization completed
        await connection.waitSynchronized();

        // console.log(terminalState.connected);
        // console.log(terminalState.connectedToBroker);
        // console.log(terminalState.accountInformation);
        // console.log(terminalState.positions);
        // console.log(terminalState.orders);

        if (terminalState.positions.length > 0) {
          const positions = terminalState.positions;
          const accountInformation = terminalState.accountInformation;

          socket.emit("loaded", {
            accountId,
            positions,
            accountInformation,
          });
        }

        // Add a listener for equity and balance changes
        // connection.addSynchronizationListener("synchronization", async () => {
        //   const accountInformation = await account.getAccountInformation();
        //   const positions = await account.getPositions();

        //   socket.emit("marketData", {
        //     accountId,
        //     positions,
        //     accountInformation,
        //   });
        // });

        // console.log(connection);

        // connection.addAccountInformationListener((data) => {
        //   console.log(data);
        //   socket.emit("accountInfo", { accountId, data });
        // });

        // Get connection instance
        // await account.waitConnected();
        // const connection = account.getRPCConnection();

        // // Wait until connection is established
        // await connection.connect();
        // await connection.waitSynchronized();

        // connection.addMarketDataListener((data) => {
        //   socket.emit("marketData", { accountId, data });
        // });

        socket.emit("subscribed", { accountId });
      } catch (error) {
        console.error(error);
        socket.emit("error", "Failed to subscribe to account");
      }
    });

    socket.on("disconnect", () => {
      // Handle disconnection logic if needed
    });
  });

  server.listen(8080, (err) => {
    if (err) throw err;
    console.log("> Ready on http://localhost:8080");
  });
});
