import React, { useContext } from 'react';
import PeakHoursPrediction from './PeakHoursPrediction';
import StaffSchedule from './StaffSchedule';
import MenuUpdates from './MenuUpdates';
import PreOrders from './PreOrders';
import { AppContext } from '../AppContext';
import { DashboardContainer, DashboardGrid, GridItem, LoadingSpinner } from '../StyledComponents';

function Dashboard() {
    const { loading } = useContext(AppContext);

    if (loading) {
        return (
            <DashboardContainer>
                <LoadingSpinner />
            </DashboardContainer>
        );
    }

    return (
        <DashboardContainer>
            <DashboardGrid>
                <GridItem>
                    <PeakHoursPrediction />
                </GridItem>
                <GridItem>
                    <StaffSchedule />
                </GridItem>
                <GridItem>
                    <MenuUpdates />
                </GridItem>
                <GridItem>
                    <PreOrders />
                </GridItem>
            </DashboardGrid>
        </DashboardContainer>
    );
}

export default Dashboard;
