import { notifications, TablePage } from "@kottster/react";
import React, { useState } from "react";

export default () => (
  <TablePage
    columnOverrides={{
      photo: (column) => ({
        ...column,
        fieldInput: {
          type: "custom",
          renderComponent: ({ value, updateFieldValue }) => {
            const [isUploading, setIsUploading] = useState(false);

            const handleFileChange = async (
              e: React.ChangeEvent<HTMLInputElement>,
            ) => {
              const file = e.target.files?.[0];
              if (!file) return;

              setIsUploading(true);
              const formData = new FormData();
              formData.append("file", file);

              try {
                // Отправляем фото на бекенд эндпоинт NestJS
                const response = await fetch(
                  "http://localhost:3000/product/upload-photo",
                  {
                    method: "POST",
                    body: formData,
                  },
                );

                if (!response.ok) {
                  throw new Error("Upload failed");
                }

                const data = await response.json();

                updateFieldValue("photo", data.url);
                notifications.info({
                  title: "Success",
                  message: "Photo was successfully uploaded!",
                });
              } catch (error) {
                console.error("Error uploading photo:", error);
                notifications.error({
                  title: "Error",
                  message: "Failure while uploading photo",
                });
              } finally {
                setIsUploading(false);
              }
            };

            return (
              <div
                style={{ display: "flex", flexDirection: "column", gap: "8px" }}
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  disabled={isUploading}
                  style={{
                    backgroundColor: "blue",
                  }}
                />
                {isUploading && (
                  <span style={{ fontSize: "12px", color: "#666" }}>
                    Loading...
                  </span>
                )}
                {value && !isUploading && (
                  <div style={{ marginTop: "8px" }}>
                    <img
                      src={value}
                      alt="Product preview"
                      style={{
                        maxWidth: "100px",
                        maxHeight: "100px",
                        objectFit: "contain",
                        borderRadius: "4px",
                        border: "1px solid #ccc",
                      }}
                    />
                  </div>
                )}
              </div>
            );
          },
        },
      }),
    }}
  />
);
