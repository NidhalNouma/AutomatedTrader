import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const storage = getStorage();

export async function uploadImg(id, file, path) {
  console.log("Uploading image...", file);
  const storageRef = ref(storage, path + "/" + id + "/" + file.name);

  // 'file' comes from the Blob or File API
  const snap = await uploadBytes(storageRef, file);
  console.log("Uploaded a blob or file!", snap);

  let r = null;
  if (snap.ref) {
    const downloadURL = await getDownloadURL(snap.ref);
    r = downloadURL;
    console.log("File available at", downloadURL);
  }

  return r;
}
