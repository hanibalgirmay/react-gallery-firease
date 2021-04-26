import { useState, useEffect } from "react";
import { projectStorage, projectFirestore, timestamp } from "../firebase/config";

const useStorage = (file) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);

  useEffect(() => {
    // firebase ref
    const storageRef = projectStorage.ref(file.name);
    const fireStoreRef = projectFirestore.collection('Gallery');

    storageRef.put(file).on(
      "state_changed",
      (snap) => {
        let percent = (snap.bytesTransferred / snap.totalBytes) * 100;
        setProgress(percent);
      },
      (err) => {
        setError(err);
      },
      async () => {
        const url = await storageRef.getDownloadURL();
        //use this url to save to firestore
        const createdAt = timestamp();
        fireStoreRef.add({url,createdAt});
        setUrl(url);
      }
    );
  }, [file]);

  return { progress, url, error };
};

export default useStorage;
