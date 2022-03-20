import { initializeApp } from "firebase/app";
import {
    getFirestore,
    setDoc,
    doc,
    collection,
    getDocs,
} from "firebase/firestore/lite";

import firebaseConfig from "../config/firebaseConfig.js";

import data from "./migration/2022.03.19-all-data.json";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const getCountriesCount = async () => {
    const countriesRef = collection(db, "countries");

    const countries = await getDocs(countriesRef);

    const countriesCount = countries.size;

    console.log("countriesCount", countriesCount);
};

const importJsonToFirestore = async () => {
    for (const collectionKey in data) {
        if (Object.hasOwnProperty.call(data, collectionKey)) {
            const documents = data[collectionKey];

            for (const documentKey in documents) {
                if (Object.hasOwnProperty.call(documents, documentKey)) {
                    const element = documents[documentKey];

                    await setDoc(doc(db, collectionKey, documentKey), element);
                }
            }
        }
    }
};

getCountriesCount();
// importJsonToFirestore();
