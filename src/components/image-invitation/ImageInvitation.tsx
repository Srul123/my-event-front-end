import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { useTranslation } from "react-i18next";
const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
  cursor: "pointer",
};

const activeStyle: React.CSSProperties = {
  borderColor: "#2196f3",
};

const acceptStyle: React.CSSProperties = {
  borderColor: "#00e676",
};

const rejectStyle: React.CSSProperties = {
  borderColor: "#ff1744",
};

const thumbsContainer: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
};

const thumb: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: "100%",
  height: "100%",
  padding: 4,
  boxSizing: "border-box",
};

const thumbInner: React.CSSProperties = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

const img: React.CSSProperties = {
  display: "block",
  width: "auto",
  height: "100%",
  maxHeight: "40vh",
};

const ImageInvitation: React.FC = () => {
  const { t } = useTranslation();
  const [files, setFiles] = useState<any[]>([]);
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: "image/jpeg, image/png",
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const stylememo = React.useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

  const thumbs = files
    .filter((file, index) => index === 0)
    .map((file) => (
      <div style={thumb} key={file.name}>
        <div style={thumbInner}>
          <img src={file.preview} style={img} />
        </div>
      </div>
    ));

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  return (
    <>
      <section className="container">
        <aside style={thumbsContainer}>{thumbs}</aside>
        <div
          {...getRootProps({ stylememo })}
          style={{
            display: "flex",
            justifyContent: "center",
            cursor: "pointer",
            border: "1px solid gray",
          }}
        >
          <input {...getInputProps()} />

          <p style={{ textAlign: "center" }}>
            {t("event_details.load_image")}{" "}
            <em>{t("event_details.format_warning")}</em>
          </p>
        </div>
      </section>
    </>
  );
};

export default ImageInvitation;
