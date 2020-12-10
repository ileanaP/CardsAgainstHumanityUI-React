export const styles = {
    Main: {
        ['@media (max-width:768px)'] : {
            textAlign: 'center'
        }
    },
    textfieldPadding: {
        paddingTop: '25px',
        fontStyle: 'italic',
        fontSize: 12
    },
    btnPadding: {
        paddingTop: '20px'
    },
    balanceBox: {
        margin: '15px',
        display: 'inline-block',
        ['@media (max-width:768px)'] : {
            margin: '0 auto'
        }
    },
    btn: {
        marginBottom: '24px',
        marginRight: '12px',
        padding: '16px',
        minWidth: 200,
        fontWeight: 'bold'
    },
    btnHover: {
        '&:hover': {
            backgroundColor: 'rgba(0,0,0,0)',
            color: 'purple'
        },
        '&:active': {
        backgroundColor: 'rgba(0,0,0,0)',
        color: 'purple'
        }
    },
    disabledBg: {
        backgroundColor: 'gray',
        color: 'gainsboro',
        cursor: 'no-drop',
        '&:hover': {
            backgroundColor: 'gray',
            color: 'gainsboro',
        },
        '&:active': {
            backgroundColor: 'gray',
            color: 'gainsboro',
        }
    },
    indigoBg: {
        backgroundColor: 'indigo',
        color: 'whitesmoke'
    },
    purpleBg: {
        backgroundColor: 'purple',
        color: 'whitesmoke'
    },
    pinkBg: {
        backgroundColor: 'deeppink',
        color: 'whitesmoke'
    },
    darkredBg: {
        backgroundColor: 'darkred',
        color: 'whitesmoke',
        '&:hover': {
            backgroundColor: 'whitesmoke',
            color: 'gray',
        },
        '&:active': {
            backgroundColor: 'whitesmoke',
            color: 'gray',
        }
    },
    formItem: {
        width: '250px'
    },
    commonerLink: {
        textDecoration: "none",
        fontWeight: "bold",
        color: "fuchsia"
    },
    litterText: {
        fontSize: 12,
        fontStyle: "italic",
        display: "inline-block"
    },
    centeredBox: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    strongTxt: {
        fontWeight: 'bold'
    },
    noDec: {
        textDecoration: 'none',
        color: 'fuchsia'
    },
    warningPaper: {
        backgroundColor: '#383838',
        padding: '10px',
        minWidth: '150px',
        margin: '15px',
        color: 'white'
    },
    blackCard: {
        backgroundColor: 'black',
        color: 'white',
        display: 'inline-block',
        width: '150px',
        height: '200px',
        margin: '15px'
    },
    whiteCard: {
        backgroundColor: 'white',
        color: 'black',
        display: 'inline-block',
        width: '100px',
        height: '150px',
        margin: '15px 5px',
        verticalAlign: 'top',
        '&:hover': {
            backgroundColor: '#ffd280',
            color: 'darkgreen'
        }
    },
    selected: {
        backgroundColor: '#ffd280',
        color: 'darkgreen'
    },
    deactivated: {
        backgroundColor: 'gainsboro',
        color: 'gray',
        '&:hover': {
            backgroundColor: 'gainsboro',
            color: 'gray'
        }
    },
    cardset: {
        /*backgroundColor: 'moccasin',*/
        margin: '5px 5px',
        padding: '0px 10px',
        '&:hover': {
            /*backgroundColor: 'darkkhaki',*/
            cursor: 'pointer',
            '& .resCard': {
                backgroundColor: '#ffb833',
                color: 'white'
            }
        },
    },
    selectedCardset: {
        '& .resCard': {
            backgroundColor: '#ffb833',
            color: 'white'
        }
    },
    rootSmtg: {
        '& label.Mui-focused': {
            color: 'indigo',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: 'pink',
        },
        '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
                borderColor: 'indigo',
            },
        },
    },
    toggleButton: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        height: "24px",
        width: "30px",
        background: "transparent",
        border: "none",
        cursor: "pointer",
        padding: "0",
        boxSizing: "border-box",
        '&:focus': {
            outline: "none"
        },
        margin: "0 auto"
    },
    toggleButtonLine: {
        width: "30px",
        height: "3px",
        backgroundColor: "#00ffff"
    },
    drawer: {
        backgroundColor: "wheat",
        boxShadow: "1px 0px 7px rgba(0,0,0,0.5)",
        position: "fixed",
        zIndex:"101",
        transition: "transform 0.3s ease-out",
    },
    drawerX: {
        top:"0",
        height:"100%",
        width:"70%",
        maxWidth: "345px",
    },
    drawerRight: {
        right:"0",
        transform: "translateX(+100%)",
    },
    drawerY: {
        left:"0",
        minHeight:"280px",
        width:"100%"
    },
    drawerBottom: {
        bottom: "0",
        transform: "translateX(+100%)",
    },
    drawerOpenX: {
        transform: "translateX(0)",
    },
    drawerOpenY: {
        transform: "translateY(0)",
    },
    sideHustle: {
        position: "fixed",
        top: "56px",
        bottom: "0",
        right: "0",
        height: "100%",
        width: "200px",
        verticalAlign: "bottom"
    },
    sideHustleTop: {
        marginTop:"106px"
    },
    sideHustleBottom: {
        bottom: "0",
        position: "fixed",
        marginBottom:"106px",
        right:"85px",
    },
    fancyTitle: {
        textDecoration: "underline",
        fontFamily: "Lucida Console",
        fontSize: "32px",
        fontStyle: "italic"
    },
    startRound: {
        bottom: "0"
    },
    creatorClass: {
        fontWeight: "bold",
        color: "purple"
    },
    confirmedClass: {
        fontWeight: "bold",
        color: "green"
    },
    linkStyle: {
        textDecoration: "none"
    },
    boxCardset: {
        overflow:"scroll", 
        height:"150px", 
        width: "300px", 
        margin: "0 auto", 
        paddingLeft:"30px", 
        paddingRight:"30px", 
        marginTop:"30px", 
        overflowX: "hidden", 
        overflowY: "auto", 
        background: "whitesmoke"
    },
    toggleSelect: {
        '&:hover': {
            cursor: "pointer",
            textDecoration:"none"
        }
    }
/*     myCustomContainer: {
        width: "500px"
    } */
}