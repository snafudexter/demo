import React, { Component } from 'react';

class PivotTable extends Component
{

    renderTableHeader(props)
    {

        const th =  <tr>{props.columns.map(p => <th key={p.key} className="text-center">{p.name}</th>)}</tr>;
        return th;
    }

    renderTableBody(props)
    {
        if(props.pivots){
        var key = 0;
        const tr =<tbody>{ props.pivots.map(
            (p) =>{
                key++;

            return (<tr key={key}>
                <td className="text-center">{p.name}</td>
                <td className="text-center">{p.storeCount}</td>
                <td className="text-center">{p.adSpotsCount}</td>
                <td className="text-center">{(p.totalArea)}</td>
                <td className="text-center">{(p.cost)}</td>
            </tr>);
            }

        )}</tbody>;
        

        return tr;
        }
        else{
            return null;
        }
    }


    render()
    {
        return (

            <div className="row gutters-only">
          <div className="col-12">
          <div className="block">
            <div>
                <table className="table table-vcenter">
                    <thead>
                           <this.renderTableHeader columns={this.props.columns} />
                    </thead>

                        <this.renderTableBody pivots={this.props.tasks} />

                </table>
            </div>
            </div>
            </div>
            </div>
        );
    }

}

export default PivotTable;
