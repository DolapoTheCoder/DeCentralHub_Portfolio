import React, { createContext, useState, useEffect } from 'react';
import socket from './socket';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [peakHours, setPeakHours] = useState([]);
    const [staffSchedule, setStaffSchedule] = useState([]);
    const [menuItems, setMenuItems] = useState([]);
    const [preOrders, setPreOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Initial data fetch
        fetchData();

        // Set up WebSocket listeners
        socket.on('updatePeakHours', (newPeakHours) => {
            setPeakHours(newPeakHours);
        });

        socket.on('updateStaffSchedule', (newStaffSchedule) => {
            setStaffSchedule(newStaffSchedule);
        });

        socket.on('updateMenuItems', (newMenuItems) => {
            setMenuItems(newMenuItems);
        });

        socket.on('newPreOrder', (newOrder) => {
            setPreOrders((prevOrders) => [...prevOrders, newOrder]);
        });

        return () => {
            // Clean up WebSocket listeners
            socket.off('updatePeakHours');
            socket.off('updateStaffSchedule');
            socket.off('updateMenuItems');
            socket.off('newPreOrder');
        };
    }, []);

    const fetchData = () => {
        // Simulate fetching initial data
        setTimeout(() => {
            setPeakHours([
                { hour: '12:00', prediction: 'High' },
                { hour: '13:00', prediction: 'Very High' },
                { hour: '18:00', prediction: 'High' },
                { hour: '19:00', prediction: 'Medium' },
            ]);

            setStaffSchedule([
                { time: '10:00 - 14:00', staff: 3 },
                { time: '14:00 - 18:00', staff: 4 },
                { time: '18:00 - 22:00', staff: 5 },
            ]);

            setMenuItems([
                { id: 1, name: 'Classic Chicken Burger', available: true },
                { id: 2, name: 'Spicy Wings', available: true },
                { id: 3, name: 'Chicken Salad', available: false },
                { id: 4, name: 'Grilled Chicken Sandwich', available: true },
                { id: 5, name: 'Chicken Nuggets', available: false },
            ]);

            setPreOrders([
                { id: 1, customerName: 'John Doe', pickupTime: '14:30', items: ['Classic Chicken Burger', 'Fries'] },
                { id: 2, customerName: 'Jane Smith', pickupTime: '15:00', items: ['Spicy Wings', 'Coleslaw'] },
                { id: 3, customerName: 'Bob Johnson', pickupTime: '15:15', items: ['Grilled Chicken Sandwich', 'Soda'] },
            ]);

            setLoading(false);
        }, 1500);
    };

    const updateMenuItemAvailability = (id, available) => {
        setMenuItems(prevItems =>
            prevItems.map(item =>
                item.id === id ? { ...item, available } : item
            )
        );
        // Emit the change to the server
        socket.emit('updateMenuItem', { id, available });
    };

    const addPreOrder = (order) => {
        const newOrder = { id: Date.now(), ...order };
        setPreOrders(prevOrders => [...prevOrders, newOrder]);
        // Emit the new order to the server
        socket.emit('newPreOrder', newOrder);
    };

    return (
        <AppContext.Provider value={{
            peakHours,
            staffSchedule,
            menuItems,
            preOrders,
            updateMenuItemAvailability,
            addPreOrder,
            loading
        }}>
            {children}
        </AppContext.Provider>
    );
};