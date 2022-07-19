export default class BaseModel { 
    getDataFromSnapshot(snapshot: FirebaseFirestore.QuerySnapshot): any {
        const data = [];
      
        snapshot.forEach((doc) => {
          data.push({ ...doc.data(), id: doc.id });
        });
      
        return data;
    }

}
