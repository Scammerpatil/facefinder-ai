"use client";
import { MissingPerson } from "@/types/MissingPerson";
import axios from "axios";
import { useEffect, useState } from "react";

interface Record {
  missingPerson: MissingPerson;
  video: string;
  createdAt: string;
  updatedAt: string;
}

const AdminMatchesPage = () => {
  const [records, setRecords] = useState<Record[]>([]);
  useEffect(() => {
    const fetchRecords = async () => {
      const res = await axios.get("/api/missing-person/records");
      setRecords(res.data);
    };
    fetchRecords();
  }, []);
  return (
    <>
      <h1 className="uppercase text-center text-2xl font-semibold">
        Find The Matches Here
      </h1>
      <div className="overflow-x-auto mt-6 bg-base-200 rounded-lg shadow-lg">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Age</th>
              <th>Last Seen Location</th>
              <th>Date Missing</th>
              <th>Description</th>
              <th>Reported On</th>
              <th>Status</th>
              <th>Video</th>
            </tr>
          </thead>
          <tbody>
            {records.length !== 0 ? (
              records.map((record, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src={record.missingPerson.image}
                            alt={record.missingPerson.name}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">
                          {record.missingPerson.name}
                        </div>
                        <div className="text-sm opacity-50">
                          {record.missingPerson.phone}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{record.missingPerson.age} years</td>
                  <td>{record.missingPerson.lastSeenLocation}</td>
                  <th>
                    {new Date(
                      record.missingPerson.dateMissing
                    ).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })}
                  </th>
                  <td>{record.missingPerson.description}</td>
                  <td>
                    {new Date(
                      record.missingPerson.createdAt
                    ).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })}
                  </td>
                  <td className="capitalize">{record.missingPerson.status}</td>
                  <td>
                    <a
                      href={record.video}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-sm btn-primary"
                    >
                      View Video
                    </a>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="hover" key={0}>
                <td colSpan={9} className="text-center text-lg font-semibold">
                  No reports found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AdminMatchesPage;
