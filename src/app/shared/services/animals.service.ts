import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { Animal } from '../model/Animal.model';


@Injectable({
  providedIn: 'root'
})
export class AnimalsService {
  formData: Animal;


  constructor(private firestore: AngularFirestore , private storage: AngularFireStorage) {
   }
   firestorePlacesCollection = this.firestore.collection('animal');

   getAnimal(){
     return this.firestore.collection('animal').snapshotChanges();
   }
   //CREATE
  async addAnimal(data: Animal): Promise<void> {
    try {
      await this.firestorePlacesCollection.add(data);
    } catch (err) {
      console.log(err);
    }
  }
  //DELETE
  async deleteAnimal(id: string): Promise<void> {
    try {
      await this.firestorePlacesCollection.doc(id).delete();
    } catch (err) {
      console.log(err);
    }
  }

  
  
  

}
