import {ProSidebar, Menu, MenuItem, SidebarContent, SidebarFooter} from 'react-pro-sidebar';
import {MdLogout, MdOutlinePlaylistAdd} from "react-icons/md";
import {FaAngleUp, FaAngleDown} from "react-icons/fa";
import {TiDelete} from "react-icons/ti";
import './Sidebar.scss';
import { useEffect, useRef, useState} from "react";
import { useMediaQuery } from 'react-responsive';
import {RiUserSharedLine} from "react-icons/all";

function Sidebar(props){
    const ref = useRef();
    
    const [displayIndex, setDisplayIndex] = useState(0);
    const isDesktop = useMediaQuery({minWidth: 992});

    // update what lists actually get displayed in the sidebar
    function updateDisplayIndex(change_by){
        if ((props.list_data.length > props.maxToDisplay) &&
            !(displayIndex === 0 && change_by < 0) &&
            !(displayIndex === props.list_data.length - props.maxToDisplay && change_by > 0)){
            setDisplayIndex(displayIndex + change_by);
        }
    }

    function handleCreateNewList(){
        if (isDesktop || !props.collapsed) {
            let newListId = props.onListAdded();  // create a new Untitled List in firestore
            // show the new list
            props.onListSelected(newListId);
            // "scroll" to the bottom of the list in the side bar to display the new list
            if (props.list_data.length > props.maxToDisplay) {
                setDisplayIndex(props.list_data.length - props.maxToDisplay + 1);
            }
        }
    }


    function handleDeleteOnClick(evt, list_id){
            // stop propagating the onClick to parent
            evt.stopPropagation();

            // if we are currently displaying the list that we are deleting
            //   the app will show the default list
            if (props.curr_list_id === list_id) {
                props.onListSelected("default-list-" + props.email);
            }

            props.onListDeleted(list_id);

            // move back one index
            updateDisplayIndex(-1);
    }
    
    // get the subset of list name that we will display
    const displayed_list = props.list_data.slice(displayIndex, displayIndex + props.maxToDisplay);

    return (
        <ProSidebar collapsed={props.collapsed} onClick={() => {
            if (!isDesktop) {
                props.setCollapseState(false);
            }
        }} ref={ref}>
            <SidebarContent>
            <Menu iconShape="square">
                <MenuItem aria-label="Add a new list" id="add-new-list" icon={<MdOutlinePlaylistAdd />}
                onKeyPress={(evt)=> {
                    // support ENTER key for keyboard control
                    if (evt.key === "Enter"){
                        handleCreateNewList();
                    }
               }}
                onClick={() => handleCreateNewList()} >New List</MenuItem>
                <MenuItem
                    aria-label="Scroll Up" id="scroll-up"
                    // if the user is tabbing into the component, they can hit ENTER to perform action
                    onKeyPress={(evt)=> {
                        if (evt.key === "Enter"){
                            updateDisplayIndex(-1);
                        }
                    }}
                    onClick={() => updateDisplayIndex(-1)}>
                    <FaAngleUp />
                </MenuItem>
                {displayed_list.map((e) => {
                        return <MenuItem aria-label="View this list"
                                         key={e.id === props.curr_list_id ? "current-list-displayed" : e.id}
                                         id={e.id === props.curr_list_id ? "current-list-displayed" : e.id}
                                         onKeyPress={(evt)=> {
                                             // if the user is tabbing into the list name and hit enter
                                             if (evt.key === "Enter"){
                                                 if (isDesktop || !props.collapsed) {
                                                     props.onListSelected(e.id)
                                                 }
                                             }
                                         }}
                                         onClick={()=> {
                                            if (isDesktop || !props.collapsed) {
                                                props.onListSelected(e.id)
                                            }
                                         }}>
                            {(e.collaborators.length > 1) && <RiUserSharedLine />} {e.list_name} {
                                (e.id !== ("default-list-" + props.email) &&
                                (isDesktop || !props.collapsed)) &&
                                (props.email === e.collaborators[0]) &&
                                <span aria-label=" ">
                                    <TiDelete
                                        aria-label="Delete this list" tabIndex="0"
                                        onKeyPress={(evt)=> {
                                            // if the user is tabbing into the delete button and hit enter
                                            if (evt.key === "Enter"){
                                                handleDeleteOnClick(evt, e.id);
                                            }
                                        }}
                                        onClick={(evt) => handleDeleteOnClick(evt, e.id)}/>
                                </span>}
                        </MenuItem>
                })
                }
                <MenuItem aria-label="Scroll down" id="scroll-down" onKeyPress={(evt)=> {
                    // if the user is tabbing into the component, they can hit ENTER to perform action
                    if (evt.key === "Enter"){
                        updateDisplayIndex(1);
                    }
                }} 
                onClick={() => updateDisplayIndex(1)}><FaAngleDown /></MenuItem>
            </Menu>
            </SidebarContent>
            <SidebarFooter>
                <Menu>
                    <MenuItem id={"user_displayed"}>{props.email}</MenuItem>
                    <MenuItem id={"logout-button"} icon={<MdLogout/>} onClick={() => props.auth.signOut()}>
                        Logout
                    </MenuItem>
                </Menu>
            </SidebarFooter>
        </ProSidebar>
    );
}

export default Sidebar;