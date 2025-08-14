export const styles = {
  cardiacBodyTable: {
    width: "100%",
    fontSize: "12px",
    padding: "0",
    borderSpacing: "7px",
    marginTop: "10px",
  },
  sliderTd: {
    padding: "16px 10px",
    width: "59%",
  },

  sliderHandle: {
    position: "absolute",
    top: "-17px",
    width: "44px",
    marginLeft: "-22px",
    fontWeight: "bold",
    textAlign: "center",
    /* border: 2px solid #000; */
    borderRadius: "2px",
    zIndex: "9",
    backgroundClip: "padding-box" /* fixes the gap */,
    WebkitBackgroundClip: "padding-box" /* for older Safari */,
    boxShadow: "0 0 0 2px #000" /* acts like a border, follows radius */,
    color: "#fff",
    fontSize: "10px",
  },
  sliderValue: {
    width: "100%",
    position: "absolute",
    top: "11px",
    height: "100%",
    fontSize: "10px",
    borderCollapse: "collapse",
  },


  sliderHandleArrowFill: {
    position: "absolute",
    top: "8px",
    fontSize: "14px",
    /* width: 20px; */
    marginLeft: "1px",
  },
  sliderBox: {
    flex: 1,
    height: "10px",
    borderRadius: "2px",
    position: "relative",

  },
  compositionTitle: {
    fontWeight: "600",
    backgroundColor: "#f8f8f8",
    padding: "12px 10px",
    width: "36%",
    borderRadius: "12px",
  },
  compositionValue: {
    backgroundColor: "#f8f8f8",
    textAlign: "center",
    color: "#000",
    padding: "12px 10px",
    borderRadius: "12px",
    width: "15%",
  },
};
