import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Logout = () => {

    const navigate = useNavigate()
    useEffect(() => {
        sessionStorage.removeItem('id')
        navigate("/")
    }, [])
    
    return (
        <>

        </>
    )
}

export default Logout
