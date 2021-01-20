import { MDBPagination, MDBPageItem, MDBPageNav} from "mdbreact";

function Pagination({ state, setState}) {

    return (
        <div >
            <MDBPagination className="mt-2">
                <MDBPageItem disabled={state === 0 ? true : false} onClick={()=> setState(state - 4)}>
                    <MDBPageNav aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                    </MDBPageNav>
                </MDBPageItem>
                <MDBPageItem active={state === 0 ? true : false} onClick={()=> setState(0)}>
                    <MDBPageNav>
                    1 <span className="sr-only">(current)</span>
                    </MDBPageNav>
                    </MDBPageItem>
                <MDBPageItem active={state === 4 ? true : false} onClick={()=> setState(4)}>
                    <MDBPageNav>2</MDBPageNav>
                </MDBPageItem>
                <MDBPageItem active={state === 8 ? true : false} onClick={()=> setState(8)}>
                    <MDBPageNav>3</MDBPageNav>
                </MDBPageItem>
                <MDBPageItem disabled={state === 8 ? true : false} onClick={()=> setState(state + 4)}>
                    <MDBPageNav aria-label="Previous">
                    <span aria-hidden="true">&raquo;</span>
                    </MDBPageNav>
                </MDBPageItem>
            </MDBPagination>
        </div>
    )
}

export default Pagination
