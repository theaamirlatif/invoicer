import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";

const StoryTable = () => {
  const [search, setSearch] = useState("");
  const [story, setStory] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const getStories = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/showAllStories");
      setStory(res.data);
      setFiltered(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    {
      name: "Sr.",
      selector: (row) => row.id,
    },
    {
      name: "Title",
      selector: (row) => row.stitle,
      sortable: true,
    },
    {
      name: "Keywords",
      selector: (row) => row.skeyword,
    },
    {
      name: "Description",
      selector: (row) => row.sdesc,
    },
    {
      name: "Action",
      cell: (row) => (
        <button className="btn btn-info" onclick={() => alert(row.id)}>
          Edit
        </button>
      ),
    },
  ];

  useEffect(() => {
    getStories();
  }, []);

  useEffect(() => {
    const result = story.filter((store) => {
      return store.stitle.toLowerCase().match(search.toLocaleLowerCase());
    });
    setFiltered(result);
  }, [search, story]);

  return (
    <>
      <div className="container">
        <div className="row">
          <DataTable
            className="table table-dark"
            columns={columns}
            data={filtered}
            pagination
            fixedHeader
            fixedHeaderScrollHeight="450"
            selectableRows
            selectableRowsHighlight
            highlightOnHover
            actions={<button className="btn btn-sm btn-info">Export</button>}
            subHeader
            subHeaderComponent={
              <input
                type="text"
                placeholder="Search here"
                className="w-25 form-control"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            }
          />
        </div>
      </div>
    </>
  );
};

export default StoryTable;
