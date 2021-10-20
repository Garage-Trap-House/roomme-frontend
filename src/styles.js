import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: "static",
    },

    toolBar: {
        display: "flex",
        justifyContent: "space-between",
    },

    icons: {
        color: "#FFFFF",
    },

    header: {
        marginTop: 100,
    }
}));

export default useStyles;