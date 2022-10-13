import { Injectable } from '@angular/core';
import { collection, collectionData, doc, docData, Firestore } from '@angular/fire/firestore';
import { getDownloadURL, listAll, ref, Storage, uploadBytes } from '@angular/fire/storage';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FireStoreService {

  constructor(private _fireStore: Firestore, private _storage: Storage) { 

  }

  getDescription$() {
    const productDocRef = doc(this._fireStore, 'portfolio/description');
    return docData(productDocRef, {idField: 'id'});
  }

  getContactLinks$() {
    const productDocRef = doc(this._fireStore, 'portfolio/contactLinks');
    return docData(productDocRef, {idField: 'id'});
  }

  getName$() {
    const productDocRef = doc(this._fireStore, 'portfolio/Name_S');
    return docData(productDocRef, {idField: 'id'});
  }

  getImagesRefs$(path: string) {
    const imagesRef = ref(this._storage, `${path}`);
    return from(listAll(imagesRef));
  }

  uploadImageProductByPath$(path: string) {
    const imageRef = ref(this._storage, `${path}`)
    return from(getDownloadURL(imageRef));
  }
}
