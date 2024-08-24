import { addAlpha } from "./functions";

/**
 * Calculate line or bar chart datasets
 *
 * @param {Array} labels - Name or Label for each dataset, this is an array of strings
 * @param {Array} data - The data of the each dataset, this array will contain arrays with number values
 * @param {Array} dataLabels - The labels of the data on each dataset, this is an array of strings
 * @param {Array} colors - The color of line/ bar chart, this is an array of strings, pass null for default color
 * @returns {number} chart datasets
 */
export function LinesBarsChartData(labels, data, dataLabels, colors) {
  const charts = labels.map((label, i) => {
    return {
      label,
      color:
        colors?.length > i
          ? colors[i]
          : addAlpha(
              getComputedStyle(document.documentElement).getPropertyValue(
                "--chart-text-color"
              ),
              0.3
            ),
      labels: dataLabels || [],
      data: data[i] || [],
    };
  });

  return charts;
}

/**
 * Calculate line or bar chart datasets for the days of the week
 *
 * @param {Array} labels - Name or Label for each dataset, this is an array of strings
 * @param {Object} data - The data of the each dataset, this object will contain a keys of the day of the weeks and values as an array
 * @param {Array} colors - The color of line/ bar chart, this is an array of strings, pass null for default color
 * @param {Array} objectKeyArray - The data key to be consider for each dataset, by default the function will calculate the length, but you can overite that by adding the name of the key that need to be calculated, it's an array of strings each string will be split by : into at least 2 substrings  the first string will be the function to be used (sum or filter), second string will be the name of the key third will be the filter value if it's availble, example : [sum:profit, filter:type:3, filter:type:>|0, filter:profit<=|0]
 * @returns {number} chart datasets
 */
export function LinesBarsChartDataDaysOfWeek(
  labels,
  data,
  colors,
  objectKeyArray = []
) {
  function compareStringWithNumber(inputStr, compareNum) {
    let symbol = inputStr.split("|")[0];
    let num = inputStr.split("|")[1];

    if (!num) num = symbol;

    switch (symbol) {
      case ">=":
        return compareNum >= num;
      case ">":
        return compareNum > num;
      case "<=":
        return compareNum <= num;
      case "<":
        return compareNum < num;
      case "=":
        return compareNum == num;
      default:
        return compareNum == num;
    }
  }

  const dataLabels = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const charts = labels.map((label, i) => {
    let newData = [];

    data?.forEach((obj) => {
      if (obj) {
        let objData = [];

        dataLabels.forEach((day) => {
          let objectKey = objectKeyArray[i] || null;
          //   console.log(objectKey, obj[day][objectKey]);

          if (objectKey && Array.isArray(obj[day])) {
            let fun = objectKey.split(":")[0];
            let key = objectKey.split(":")[1];
            let filterVal = objectKey.split(":")[2];

            let total = 0;
            if (fun == "sum")
              total = obj[day].reduce((sum, per) => sum + per[key], 0);

            if (fun == "filter")
              total = obj[day].filter((v) =>
                compareStringWithNumber(filterVal, v[key])
              ).length;

            objData.push(total);
          } else
            objData.push(
              (objectKey && obj[day][objectKey]) || obj[day]?.length || 0
            );
        });

        newData.push(objData);
      }
    });

    return {
      label,
      color:
        colors?.length > i
          ? colors[i]
          : addAlpha(
              getComputedStyle(document.documentElement).getPropertyValue(
                "--chart-text-color"
              ),
              0.3
            ),
      labels: dataLabels || [],
      data: newData[i] || [],
    };
  });

  return charts;
}
