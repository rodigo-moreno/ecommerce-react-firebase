import { useEffect, useState } from "react";
import { pedirDatos } from "../helpers/pedirDatos";
import ItemList from "./ItemList";
import { useParams } from "react-router-dom";
import { collection, getDocs,query,where } from "firebase/firestore";
import { db } from "../Firebase/config";



const ItemListContainer = ()=>{
const [productos, setProductos] = useState([]);
const [titulo, setTitulo] = useState("Productos");
console.log(productos)
const categoria = useParams().categoria;

useEffect(()=>{
   const productosRef = collection(db,"productos");

   const q = categoria ? query(productosRef,where("categoria","==",categoria)) : productosRef;
   getDocs(q)
   .then((res)=>{
   setProductos(
    res.docs.map((doc)=>{
        return {...doc.data(),id:doc.id}
    }))
   })
},[categoria])

    return(
        <div><ItemList  productos={productos} titulo={titulo}/></div>
    )
}
export default ItemListContainer