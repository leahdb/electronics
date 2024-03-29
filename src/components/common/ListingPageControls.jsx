import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import importIcon from "../../resources/themes/dashboard-v1/icons/import.svg";
import exportIcon from "../../resources/themes/dashboard-v1/icons/export.svg";
import printIcon from "../../resources/themes/dashboard-v1/icons/print.svg";
import SearchBar from "./SearchBar";
import { notify_promise } from "../../services/utils/toasts";
import DataFilterButtons, { STYLE_LINKS } from "./DataFilterButtons";

const ListingPageControls = ({
  exportApi,
  type,
  addNewLink,
  hasTitle,
  hasTabs,
  title,
  resultType,
  filters,
  newShopsCount,
  hasSingleTitle,
  isCalendar,
  buttonAndTabs,
  setSearch,
  noExport,
  addOnly
}) => {
  const exportFunction = () => {
    notify_promise(
      new Promise((resolve, reject) => {
        exportApi()
          .then((res) => {
            resolve(res);
          })
          .catch(reject);
      }),
      "Export in progress! Watch your inbox for the download link soon",
      "📧"
    );
  };

  const openImportModal = (e) => {
    e.preventDefault();
    document.getElementById("importFilePopup").style.display = "flex";
  };

  return (
    <>
      <div className="no-print d-flex flex-xl-row flex-column justify-content-between align-items-center mb-4 max-height-btn">
        <div
          className={`d-flex flex-row control-container gap-2 ${
            hasTabs ? "align-items-end" : ""
          }`}
        >
          {hasTitle ? (
            <div className="mb-4">
              <span className="fw-bold dashboard-title">{title}</span>
              <div className="breadcrumbs path fw-semibold gap-2 d-flex flex-row">
                <Link className={"link"} to={"/admin/services/categories"}>
                  Services
                </Link>
                <span>&gt;</span>
                <span>New Service</span>
              </div>
            </div>
          ) : hasTabs ? (
            <>
              {filters.length > 0 ? (
                <DataFilterButtons
                  filters={filters}
                  newShopsCount={newShopsCount}
                  style={STYLE_LINKS}
                />
              ) : (
                ""
              )}
            </>
          ) : hasSingleTitle ? (
            <h1 className="dashboard-title">{resultType}s</h1>
          ) : isCalendar || addOnly || buttonAndTabs ? (
            <Link to={addNewLink} className={"btn btn-primary"}>
              + Add New {type}
            </Link>
          ) : (
            <>
              <Link to={addNewLink} className={"btn btn-primary"}>
                + Add New {type}
              </Link>
              <div className="d-flex flex-column align-items-center">
                <button
                  type={"button"}
                  className={"btn btn-primary btn-light-primary"}
                  onClick={openImportModal}
                >
                  <img
                    className={"btn-icon btn-icon-left"}
                    src={importIcon}
                    alt="import icon"
                  />
                  Import From File
                </button>
                <div className="sample">
                  <a
                    href={
                      process.env.REACT_APP_DASHBOARD_API_URL +
                      `/downloads/import-sample-${type}s.csv`
                    }
                    download={`import-sample-${type}s.csv`}
                  >
                    Download Sample File
                  </a>
                </div>
              </div>
            </>
          )}
        </div>

        <div className={"page-control-container d-flex flex-row gap-1"}>
          {isCalendar ? (
            <></>
          ) : (
            <SearchBar
              type="list"
              resultType={resultType}
              setSearch={setSearch}
            />
          )}
          <div className="mb-xl-0 mb-3">
            <button
              className={"btn btn-primary btn-light-primary"}
              onClick={() => {
                window.print();
              }}
            >
              Print
              <img
                className={"btn-icon btn-icon-right"}
                src={printIcon}
                alt="print icon"
              />
            </button>
          </div>
          <div className="mb-xl-0 mb-3">
            {noExport ? (
              <></>
            ) : (
              <button className={"btn btn-primary"} onClick={exportFunction}>
                Export
                <img
                  className={"btn-icon btn-icon-right"}
                  src={exportIcon}
                  alt="export icon"
                />
              </button>
            )}
          </div>
        </div>
      </div>
      {buttonAndTabs ? (
        <>
          {filters.length > 0 ? (
            <DataFilterButtons
              filters={filters}
              newShopsCount={newShopsCount}
              style={STYLE_LINKS}
            />
          ) : (
            ""
          )}
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default ListingPageControls;
