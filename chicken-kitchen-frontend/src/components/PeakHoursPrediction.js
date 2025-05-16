import React, { useContext } from 'react';
import { AppContext } from '../AppContext';
import { SectionTitle, List, ListItem } from '../StyledComponents';
import styled from 'styled-components';

const PredictionBar = styled.div`
  background-color: #4169e1;
  height: 20px;
  width: ${props => props.width}%;
`;

const PredictionItem = styled(ListItem)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

function PeakHoursPrediction() {
    const { peakHours } = useContext(AppContext);

    const getPredictionWidth = (prediction) => {
        switch (prediction.toLowerCase()) {
            case 'low': return 25;
            case 'medium': return 50;
            case 'high': return 75;
            case 'very high': return 100;
            default: return 0;
        }
    };

    return (
        <div className="peak-hours-prediction">
            <SectionTitle>Peak Hours Prediction</SectionTitle>
            <List>
                {peakHours.map((peak, index) => (
                    <PredictionItem key={index}>
                        <span>{peak.hour}: {peak.prediction}</span>
                        <PredictionBar width={getPredictionWidth(peak.prediction)} />
                    </PredictionItem>
                ))}
            </List>
        </div>
    );
}

export default PeakHoursPrediction;
