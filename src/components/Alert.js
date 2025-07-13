import React from "react";

function Alert(props) {
  // Map alert types to Font Awesome icons
  const getAlertIcon = (type) => {
    switch (type) {
      case "success":
        return "fa-circle-check";
      case "danger":
        return "fa-circle-exclamation";
      case "warning":
        return "fa-triangle-exclamation";
      case "info":
        return "fa-circle-info";
      default:
        return "fa-bell";
    }
  };

  return (
    <>
      {props.alert && (
        <div
          className={`alert alert-${props.alert.type} shadow-lg`}
          role="alert"
          style={{
            position: "fixed",
            top: "80px",
            right: "20px",
            zIndex: 9999,
            minWidth: "300px",
            maxWidth: "90%",
            borderRadius: "var(--border-radius)",
            padding: "15px 20px",
            fontSize: "0.95rem",
            fontWeight: 500,
            boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)",
            border: "none",
            display: "flex",
            alignItems: "center",
            animation: "slideIn 0.3s ease-out forwards",
          }}
        >
          <i className={`fas ${getAlertIcon(props.alert.type)} me-2`} 
             style={{ fontSize: "1.2rem" }}></i>
          <div>
            <strong className="text-capitalize me-1">{props.alert.type}:</strong>
            {props.alert.message}
          </div>
        </div>
      )}
      <style jsx="true">{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
}

export default Alert;
