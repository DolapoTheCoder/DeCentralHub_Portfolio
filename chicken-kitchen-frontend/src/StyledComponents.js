import styled from 'styled-components';

export const DashboardContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

export const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
`;

export const GridItem = styled.div`
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
`;

export const SectionTitle = styled.h3`
  color: #333;
  font-size: 1.2em;
  margin-bottom: 15px;
  border-bottom: 2px solid #4169e1;
  padding-bottom: 5px;
`;

export const List = styled.ul`
  list-style-type: none;
  padding: 0;
`;

export const ListItem = styled.li`
  margin-bottom: 10px;
  padding: 10px;
  background-color: ${props => props.available ? '#e6ffe6' : '#ffe6e6'};
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Button = styled.button`
  background-color: #4169e1;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #3050c0;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
`;

export const Input = styled.input`
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

export const Header = styled.header`
  background-color: #4169e1;
  color: white;
  padding: 20px;
  text-align: center;
`;

export const HeaderTitle = styled.h1`
  margin: 0;
  font-size: 2em;
  @media (max-width: 768px) {
    font-size: 1.5em;
  }
`;

export const LoadingSpinner = styled.div`
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: spin 1s linear infinite;
  margin: 20px auto;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;