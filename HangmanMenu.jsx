import React from "react";

const Menu=()=> {
    return (
        <div className="Menu">
            <ul className="Options">
                <li className="MenuOptions" onClick={NewGame}>New Game</li>;
                <li className="MenuOptions" onClick={LogIn}>Log In</li>;
                <li className="MenuOptions" onClick={ChooseCategory}>Choose Category</li>;
                <li className="MenuOptions" onClick={AddNewCategory}>Add New Category</li>;
            </ul>
            
        </div>

    

    );
};

export default Menu;