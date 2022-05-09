import React, { useEffect, useState } from 'react';
import { collection, onSnapshot, getDocs } from 'firebase/firestore';
import { firestore } from './FIREBASE_CONFIG';

const Posts = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        onSnapshot(collection(firestore, 'posts', 'posts', 'posts'), docSnap => {
            let _data = []
            docSnap.forEach(doc => {
                _data.push(doc.data())
            })
            setData(_data)
        })
    }, [])
}

export default Posts;