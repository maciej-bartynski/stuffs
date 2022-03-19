import styled from 'styled-components';
import { default as CardAtoms } from "atomic/atoms/Card";
import { COLUMN_WIDTH_PX } from './StatusColumns.lib';
import DraggableListStyles from 'atomic/molecules/DraggableList/DraggableList.styles';

const AddStatusWrapper = styled.div<{ translateX: number }>`
    width: ${COLUMN_WIDTH_PX}px;
    padding-top: 20px;
`;

const Positioner = styled.div`
    width: calc(100% - 20px); 
    height: 800px;
    overflow: auto; 
    box-sizing: content-box;
    padding: 20px 10px;
`;

const Container = styled.div`
    width: 100%, 
    height: 100%, 
    position: relative;
`;

const StatusColumnsAtoms = {
    AddStatusWrapper,
    ...CardAtoms,
    ...DraggableListStyles,
    Positioner,
    Container
}

export type StatusColumnsAtomsType = typeof StatusColumnsAtoms;

export default StatusColumnsAtoms;
