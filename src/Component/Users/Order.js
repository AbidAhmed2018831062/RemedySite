import React from 'react';
import styles from 'D:/medicine/src/asset/css/order.module.css';
function Order({order,index})
{
   
    let  month_names= ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const date=new Date(order.date);
      let appDate=date.getDate()+" "+month_names[date.getMonth()]+" "+date.getFullYear();
return(
    <div className={styles.order}>
        <div className={styles.details}>
    <h2>Order Invoice-{index+1}</h2>
    <div className={styles.detailsdiv}>
    <div className={styles.part1}>
        <pre>Token&nbsp;&nbsp;&nbsp;        :  {order.token}</pre>
        <pre>Name&nbsp;&nbsp;&nbsp;        :  {order.name}</pre>
        <pre>Phone&nbsp;&nbsp;&nbsp;       :  {order.phone}</pre>
    </div>
    <div className={styles.part2}>
        <pre>Address       :  {order.address}</pre>
        <pre>Date             :  {appDate}</pre>
        <pre>Price             :  {order.price}</pre>
    </div>
</div>
</div>
</div>
)
}

export default Order;