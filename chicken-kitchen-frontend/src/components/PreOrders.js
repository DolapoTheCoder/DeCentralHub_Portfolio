import React, { useContext, useState } from 'react';
import { AppContext } from '../AppContext';
import { SectionTitle, List, ListItem, Form, Input, Button } from '../StyledComponents';

function PreOrders() {
    const { preOrders, addPreOrder } = useContext(AppContext);
    const [newOrder, setNewOrder] = useState({ customerName: '', pickupTime: '', items: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        addPreOrder({
            ...newOrder,
            items: newOrder.items.split(',').map(item => item.trim())
        });
        setNewOrder({ customerName: '', pickupTime: '', items: '' });
    };

    return (
        <div className="pre-orders">
            <SectionTitle>Pre-Orders</SectionTitle>
            <List>
                {preOrders.map(order => (
                    <ListItem key={order.id}>
                        <strong>{order.customerName}</strong> - Pickup at {order.pickupTime}
                        <br />
                        Items: {order.items.join(', ')}
                    </ListItem>
                ))}
            </List>
            <Form onSubmit={handleSubmit}>
                <Input
                    type="text"
                    placeholder="Customer Name"
                    value={newOrder.customerName}
                    onChange={(e) => setNewOrder({ ...newOrder, customerName: e.target.value })}
                />
                <Input
                    type="text"
                    placeholder="Pickup Time"
                    value={newOrder.pickupTime}
                    onChange={(e) => setNewOrder({ ...newOrder, pickupTime: e.target.value })}
                />
                <Input
                    type="text"
                    placeholder="Items (comma-separated)"
                    value={newOrder.items}
                    onChange={(e) => setNewOrder({ ...newOrder, items: e.target.value })}
                />
                <Button type="submit">Add Pre-Order</Button>
            </Form>
        </div>
    );
}

export default PreOrders;