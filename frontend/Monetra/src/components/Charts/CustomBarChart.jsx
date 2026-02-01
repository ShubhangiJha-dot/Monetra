import React from 'react'
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Cell,
} from "recharts"


const CustomBarChart = ({data, xKey, labelKey}) => {

    //fxn to alt colors
    const getBarColor=(index)=>{
        return index%2===0 ? "#875cf5":"#cfbefb"
    }

//     const CustomTooltip=({active,payload})=>{
//         if(active && payload && payload.length){
//             return(
//                 <div className="bg-white shadow-md rounded-lg p-2 border border-gray-300">
//                     {/* <p className="text-xs font-semibold text-purple-800 mb-1">{payload[0].payload.category}</p> */}

//                     <p className="text-xs font-semibold text-purple-800 mb-1">
//   {payload[0].payload[labelKey]}
// </p>

//                     <p className="text-sm text-gray-600">
//                         Amount: <span className='text-sm font-medium text-gray-900'>${payload[0].payload.amount}</span>
//                     </p>
//                 </div>
//             )
//         }
//         return null
//     }
  return (
    <div className="bg-white mt-6 ">
        <ResponsiveContainer width="100%" height={300}>
            {/* <BarChart data={data}> */}
            <BarChart
  data={data}
  onMouseMove={(e) => console.log("hover:", e)}
>

                <CartesianGrid stroke="none"/>

                {/* <XAxis dataKey="category" tick={{fontSize:12, fill: "#555"}} stroke="none"/> */}

                <XAxis dataKey={xKey} tick={{fontSize:12, fill: "#555"}} stroke="none"/>

                <YAxis tick={{fontSize:12, fill:"#555"}} stroke="none"/>


<Tooltip
  cursor={{ fill: "rgba(0,0,0,0.04)" }}
  content={({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white shadow-md rounded-lg p-2 border border-gray-300">
          <p className="text-xs font-semibold text-purple-800 mb-1">
            {data[xKey]}
          </p>

          <p className="text-xs text-gray-500 mb-1">
            {data.month}
          </p>

          <p className="text-sm text-gray-600">
            Amount:{" "}
            <span className="text-sm font-medium text-gray-900">
              ${data.amount}
            </span>
          </p>
        </div>
      );
    }
    return null;
  }}
/>




                <Bar
                    dataKey="amount"
                    fill="#FF8042"
                    radius={[10,10,0,0]}
                    activeDot={{r:8, fill:"yellow"}}
                    activeStyle={{fill:"green"}}
                >
                    {data.map((entry,index)=>(
                        <Cell key={index} fill={getBarColor(index)} />
                    ))}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    </div>
  )
}



export default CustomBarChart
