"use client";
import { MissingPerson } from "@/types/MissingPerson";
import axios from "axios";
import { set } from "mongoose";
import { useEffect, useState } from "react";

const Reports = () => {
  const [missingPeople, setMissingPeople] = useState<MissingPerson[]>([]);
  useEffect(() => {
    const fetchMissingPeople = async () => {
      const res = await axios.get("/api/missing-person/get-all-for-user");
      setMissingPeople(res.data);
    };
    fetchMissingPeople();
  }, []);
  return (
    <>
      <h1 className="text-3xl uppercase text-center font-semibold">
        Your Reports of Missing People
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
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {missingPeople.length !== 0 ? (
              missingPeople.map((missingPerson, index) => (
                <tr key={missingPerson._id} className="hover">
                  <th>{index + 1}</th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src={missingPerson.image}
                            alt={missingPerson.name}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{missingPerson.name}</div>
                        <div className="text-sm opacity-50">
                          {missingPerson.phone}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{missingPerson.age} years</td>
                  <td>{missingPerson.lastSeenLocation}</td>
                  <th>
                    {new Date(missingPerson.dateMissing).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      }
                    )}
                  </th>
                  <td>{missingPerson.description}</td>
                  <td>
                    {new Date(missingPerson.createdAt).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      }
                    )}
                  </td>
                  <td className="capitalize">{missingPerson.status}</td>
                  <td>
                    <button className="btn btn-sm btn-primary">Edit</button>
                    <button className="btn btn-sm btn-error ml-2">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="hover" key="no-reports">
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

export default Reports;
