import React, { useContext } from 'react';
import { AppContext } from '../AppContext';
import { SectionTitle, List, ListItem, Button } from '../StyledComponents';

function MenuUpdates() {
    const { menuItems, updateMenuItemAvailability } = useContext(AppContext);

    return (
        <div className="menu-updates">
            <SectionTitle>Real-Time Menu Updates</SectionTitle>
            <List>
                {menuItems.map(item => (
                    <ListItem key={item.id} available={item.available}>
                        {item.name}
                        <Button onClick={() => updateMenuItemAvailability(item.id, !item.available)}>
                            {item.available ? 'Mark Unavailable' : 'Mark Available'}
                        </Button>
                    </ListItem>
                ))}
            </List>
        </div>
    );
}

export default MenuUpdates;