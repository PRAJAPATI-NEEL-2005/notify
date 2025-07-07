import React from "react";

function Alert(props) {
  return (
    <>
      {props.alert && (
        <div
          className={`alert alert-${props.alert.type} shadow`}
          role="alert"
          style={{
            position: "fixed",
            top: "70px", // Adjust based on your navbar height
            right: "20px",
            zIndex: 9999,
            minWidth: "250px",
            maxWidth: "90%",
            borderRadius: "8px",
            padding: "15px 20px",
            fontSize: "0.95rem",
            fontWeight: 500,
            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
          }}
        >
          <strong className="text-capitalize">{props.alert.type}</strong>:{" "}
          {props.alert.message}
        </div>
      )}
    </>
  );
}

export default Alert;
