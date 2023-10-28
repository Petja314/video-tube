import React, {useEffect, useState} from 'react';
import styles from "./users.module.css";
import classnames from "classnames"
import {incrementCurrentPageButton} from "../redux/UsersReducer";
const PaginationUsers = (props: any) => {
    console.log(props.currentPage)
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)
    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }


    let portionSize = 10
    let portionCount = Math.ceil(pagesCount / portionSize)
    let [portionNumber, setPortionNumber] = useState(1)
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
    let rightPortionPageNumber = portionNumber * portionSize

    useEffect(()=>setPortionNumber(Math.ceil(props.currentPage/portionSize)), [props.currentPage]);

    return (
        <div>

            {portionNumber > 1 &&
                <button onClick={() => {
                    setPortionNumber(portionNumber - 1)
                }}> PREVIOUS </button>
            }

            {pages
                .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                .map((p) => {
                    return <span className={classnames({
                        [styles.selectedPage]: props.currentPage === p
                    })}
                                 key={p}
                                 onClick={(e: any) => {
                                     props.onPageChange(p)
                                 }}>{p}
                    </span>
                })}
            {portionCount > portionNumber &&
                <button onClick={() => setPortionNumber(portionNumber +1) }> NEXT </button>
            }












            {/*INCREMENT CALL BUTTON*/}
            {/*{portionCount > portionNumber &&*/}
            {/*    <button onClick={() => props.incrementPage(props.currentPage +1) }> NEXT </button>*/}
            {/*}*/}
            {/*INCREMENT CALL BUTTON*/}

            {/*{pages.map((item, index: any) => {*/}
            {/*    return <span*/}
            {/*        onClick={(e: any) => {*/}
            {/*            props.onPageChange(item)*/}
            {/*        }}*/}
            {/*        className={props.currentPage === item ? styles.selectedPage : ''} key={index}>*/}
            {/*              {item}*/}
            {/*          </span>*/}
            {/*})}*/}
        </div>
    );
};

export default PaginationUsers;