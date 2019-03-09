import React from 'react';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import { FlatButton } from 'material-ui';

const TableExampleSimple = (props) => (
    <Table>
        <TableHeader displaySelectAll = {false} adjustForCheckbox={false}>
            <TableRow>
                <TableHeaderColumn>Title</TableHeaderColumn>
                <TableHeaderColumn>Amount(PLN)</TableHeaderColumn>
                <TableHeaderColumn>Amoutn(EUR)</TableHeaderColumn>
                <TableHeaderColumn>Options</TableHeaderColumn>
            </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox ={false}>
            {props.myExp.map((value, index) => {
                return <TableRow>
                    <TableRowColumn>{value.title}</TableRowColumn>
                    <TableRowColumn>{props.round(value.amount)}</TableRowColumn>
                    <TableRowColumn>{props.round(value.amount / 4.382)}</TableRowColumn>
                    <TableRowColumn><FlatButton onClick={()=>props.remove(index)}>Delete</FlatButton></TableRowColumn>
                </TableRow>
            })}
        </TableBody>
    </Table>
);

export default TableExampleSimple;