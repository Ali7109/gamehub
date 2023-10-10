import { getStorage, ref } from "firebase/storage";


const ImageReference = () => {

    // Get a reference to the storage service, which is used to create references in your storage bucket
    const storage = getStorage();

    // Create a storage reference from our storage service
    const storageRef = ref(storage);
    console.log(storageRef)

    return (
    <div>ImageReference</div>
  )
}

export default ImageReference