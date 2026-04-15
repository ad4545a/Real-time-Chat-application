import { neobrutalism } from "@clerk/themes";

export const clerkAppearance = {
  baseTheme: neobrutalism,

  variables: {
    
    colorPrimary: "#CAFF00",             
    colorDanger:  "#FF4040",              
    colorSuccess: "#00FFA3",              
    colorWarning: "#FF8C00",
    colorBackground:      "#141414",    
    colorInputBackground: "#1E1E1E",
    colorNeutral:         "#FFFFFF",
    colorText:                    "#FFFFFF",
    colorTextSecondary:           "#777777",
    colorTextOnPrimaryBackground: "#000000",
    borderRadius: "0px", 
    fontFamily:        "'DM Sans', sans-serif",
    fontFamilyButtons: "'Syne', sans-serif",
    fontWeight: { bold: 800, medium: 600, normal: 400 },
    fontSize:          "14px",
  },

  elements: {
   
    card: {
      backgroundColor: "#141414",
      border: "2px solid #ffffff",
      boxShadow: "4px 4px 0px #CAFF00",
      borderRadius: "0px",
    },

    headerTitle: {
      fontFamily: "'Syne', sans-serif",
      fontWeight: "800",
      textTransform: "uppercase",
      letterSpacing: "0.02em",
      color: "#FFFFFF",
    },
    headerSubtitle: { color: "#777777", fontSize: "13px" },

 
    socialButtonsBlockButton: {
      backgroundColor: "#1E1E1E",
      border: "2px solid #FFFFFF",
      borderRadius: "0px",
      color: "#FFFFFF",
      fontFamily: "'DM Sans', sans-serif",
      fontWeight: "600",
      transition: "border-color 80ms, color 80ms",
    },
    socialButtonsBlockButtonText: { color: "#FFFFFF" },

  
    dividerLine: { backgroundColor: "rgba(255,255,255,0.12)" },
    dividerText:  { color: "#555555", fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.15em" },

 
    formFieldLabel: {
      fontFamily: "'JetBrains Mono', monospace",
      fontSize:   "10px",
      textTransform: "uppercase",
      letterSpacing: "0.15em",
      color: "#777777",
    },
    formFieldInput: {
      backgroundColor: "#1E1E1E",
      border: "2px solid #FFFFFF",
      borderRadius: "0px",
      color: "#FFFFFF",
      fontFamily: "'DM Sans', sans-serif",
      fontSize:   "14px",
    },
    formFieldInputShowPasswordButton: { color: "#777777" },
    formFieldErrorText: { color: "#FF4040", fontFamily: "'JetBrains Mono', monospace", fontSize: "10px" },
    formFieldHintText:  { color: "#555555", fontSize: "12px" },

    formButtonPrimary: {
      backgroundColor: "#CAFF00",
      color: "#000000",
      border: "2px solid #000000",
      borderRadius: "0px",
      fontFamily: "'Syne', sans-serif",
      fontWeight: "800",
      textTransform: "uppercase",
      letterSpacing: "0.06em",
      fontSize: "13px",
      boxShadow: "2px 2px 0px #000000",
      transition: "transform 80ms, box-shadow 80ms",
    },

 
    formButtonReset: {
      color: "#CAFF00",
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: "11px",
    },


    footerActionLink:   { color: "#CAFF00", fontWeight: "700" },
    footerActionText:   { color: "#555555", fontSize: "13px" },
    footer:             { borderTop: "1px solid rgba(255,255,255,0.08)" },
    footerPages:        { backgroundColor: "#141414" },


    navbarButton: {
      fontFamily: "'Syne', sans-serif",
      fontWeight: "700",
      textTransform: "uppercase",
      letterSpacing: "0.05em",
      fontSize: "11px",
      color: "#777777",
      borderRadius: "0px",
    },
    navbarButtonActive: { color: "#CAFF00", borderBottom: "2px solid #CAFF00" },
    navbar: {
      borderRight: "2px solid rgba(255,255,255,0.08)",
      backgroundColor: "#141414",
    },
    pageScrollBox: { backgroundColor: "#0D0D0D" },

    page: { backgroundColor: "#0D0D0D" },
    profilePage: { backgroundColor: "#0D0D0D" },
    profileSectionTitle: {
      fontFamily: "'Syne', sans-serif",
      fontWeight: "800",
      textTransform: "uppercase",
      letterSpacing: "0.04em",
      color: "#FFFFFF",
      fontSize: "12px",
      borderBottom: "1px solid rgba(255,255,255,0.08)",
    },
    profileSectionContent: { backgroundColor: "transparent" },
    profileSectionPrimaryButton: {
      backgroundColor: "transparent",
      border: "2px solid #FFFFFF",
      borderRadius: "0px",
      color: "#FFFFFF",
      fontFamily: "'Syne', sans-serif",
      fontWeight: "700",
      fontSize: "12px",
      textTransform: "uppercase",
    },

 
    avatarBox: {
      borderRadius: "0px",
      border: "2px solid #FFFFFF",
    },
    avatarImageActionsButton: {
      backgroundColor: "#1E1E1E",
      border: "2px solid #FFFFFF",
      borderRadius: "0px",
      color: "#FFFFFF",
    },

    badge: {
      backgroundColor: "#CAFF00",
      color: "#000000",
      borderRadius: "0px",
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: "9px",
      fontWeight: "700",
      textTransform: "uppercase",
      letterSpacing: "0.1em",
    },

    otpCodeFieldInput: {
      backgroundColor: "#1E1E1E",
      border: "2px solid #FFFFFF",
      borderRadius: "0px",
      color: "#FFFFFF",
      fontFamily: "'JetBrains Mono', monospace",
    },

    userButtonPopoverCard: {
      backgroundColor: "#141414",
      border: "2px solid #FFFFFF",
      boxShadow: "4px 4px 0px #CAFF00",
      borderRadius: "0px",
    },
    userButtonPopoverActionButton: {
      borderRadius: "0px",
      fontFamily: "'DM Sans', sans-serif",
      fontWeight: "600",
    },
    userButtonPopoverActionButtonText: { color: "#FFFFFF" },
    userButtonPopoverActionButtonIcon: { color: "#CAFF00" },
    userButtonPopoverFooter: { display: "none" },
    userPreviewMainIdentifier: {
      fontFamily: "'Syne', sans-serif",
      fontWeight: "800",
      color: "#FFFFFF",
      textTransform: "uppercase",
      letterSpacing: "0.04em",
    },
    userPreviewSecondaryIdentifier: { color: "#777777", fontSize: "12px" },

    alert: {
      backgroundColor: "#1E1E1E",
      border: "2px solid rgba(255,255,255,0.2)",
      borderRadius: "0px",
    },
    alertText: { color: "#FFFFFF", fontSize: "13px" },
    alertTextDanger: { color: "#FF4040" },

    spinner: { color: "#CAFF00" },
  },
};

export const userButtonAppearance = {
  baseTheme: neobrutalism,
  variables: clerkAppearance.variables,
  elements: {
    ...clerkAppearance.elements,
    avatarBox: {
      borderRadius: "0px",
      border: "2px solid #FFFFFF",
      width: "32px",
      height: "32px",
    },
  },
};
