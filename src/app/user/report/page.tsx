"use client";
import { IconMail } from "@tabler/icons-react";
import axios, { AxiosResponse } from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

const RegisterMissingPerson = () => {
  const [person, setPerson] = useState({
    name: "",
    age: 0,
    phone: "",
    lastSeenLocation: "",
    dateMissing: "",
    description: "",
    image: "",
  });
  const [registered, setRegistered] = useState(false);
  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!person.name) {
      toast.error("Name is required for images");
      return;
    }
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) {
        alert("File size exceeds 5MB");
        return;
      }
      const imageResponse = axios.postForm("/api/helper/upload-img", {
        file,
        name: person.name,
        folderName: "profileImages",
      });
      console.log(imageResponse);
      toast.promise(imageResponse, {
        loading: "Uploading Image...",
        success: (data: AxiosResponse) => {
          setPerson({
            ...person,
            image: data.data.path,
          });
          return "Image Uploaded Successfully";
        },
        error: (err: unknown) => `This just happened: ${err}`,
      });
    }
  };

  const handleRegisterMissingPerson = async () => {
    if (
      !person.name ||
      !person.age ||
      !person.phone ||
      !person.lastSeenLocation ||
      !person.dateMissing ||
      !person.description ||
      !person.image
    ) {
      toast.error("Please fill all the fields");
      return;
    }
    try {
      const res = axios.post("/api/missing-person/register-in-db", { person });
      toast.promise(res, {
        loading: "Registering Missing Person...",
        success: () => {
          return "Missing Person registered successfully";
        },
        error: (error) => {
          console.log(error);
          return "Error registering missing person";
        },
      });
    } catch (error) {
      console.log(error);
      toast.error("Error registering resident");
    }
  };

  const handleRegister = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files?.length === 0) {
      toast.error("No files selected");
      return;
    }
    if (!person.name) {
      toast.error("Name is required for images");
      return;
    }
    if (files?.length! !== 10) {
      toast.error("You can only upload a maximum of 10 images");
      return;
    }
    const formData = new FormData();
    for (let i = 0; i < files?.length!; i++) {
      const file = files![i];
      if (file.size > 5 * 1024 * 1024) {
        alert("File size exceeds 5MB");
        return;
      }
      formData.append("files", file);
    }
    formData.append("name", person.name);
    console.log(formData);
    try {
      const res = axios.post("/api/missing-person/register", formData);
      toast.promise(res, {
        loading: "Uploading Images...",
        success: () => {
          setRegistered(true);
          return "Images Uploaded Successfully";
        },
        error: (err: any) => `This just happened: ${err?.response?.data.error}`,
      });
    } catch (error) {}
  };

  return (
    <>
      <h1 className="text-3xl uppercase text-center font-semibold mb-6">
        Register Missing Person
      </h1>
      <div className="mx-auto w-full max-w-md border border-base-300 bg-base-300 shadow-lg p-6 rounded-lg space-y-3">
        <fieldset className="fieldset w-full">
          <legend className="fieldset-legend">
            What is the Person's Name?
          </legend>
          <input
            type="text"
            className="input input-primary w-full"
            placeholder="Please Enter The Name Here..."
            value={person.name}
            onChange={(e) => setPerson({ ...person, name: e.target.value })}
          />
        </fieldset>

        <fieldset className="fieldset w-full">
          <legend className="fieldset-legend">Phone Number</legend>
          <input
            type="text"
            pattern="[0-9]{10}"
            minLength={10}
            maxLength={10}
            className="input input-primary w-full"
            placeholder="Please Enter The Phone Number Here..."
            value={person.phone}
            onChange={(e) => setPerson({ ...person, phone: e.target.value })}
          />
        </fieldset>
        <fieldset className="fieldset w-full">
          <legend className="fieldset-legend">What is the Person's Age?</legend>
          <input
            type="number"
            min={0}
            max={120}
            className="input input-primary w-full"
            placeholder="Please Enter The Age Here..."
            value={person.age}
            onChange={(e) =>
              setPerson({ ...person, age: parseInt(e.target.value) })
            }
          />
        </fieldset>

        <fieldset className="fieldset">
          <legend className="fieldset-legend">Last Seen Location</legend>
          <input
            type="text"
            className="input input-primary w-full"
            placeholder="Where was the person last seen?"
            value={person.lastSeenLocation}
            onChange={(e) =>
              setPerson({ ...person, lastSeenLocation: e.target.value })
            }
          />
        </fieldset>

        <fieldset className="fieldset">
          <legend className="fieldset-legend">Date Missing</legend>
          <input
            type="date"
            max={new Date().toISOString().split("T")[0]}
            className="input input-primary w-full"
            value={person.dateMissing}
            onChange={(e) =>
              setPerson({ ...person, dateMissing: e.target.value })
            }
          />
        </fieldset>

        <fieldset className="fieldset">
          <legend className="fieldset-legend">Description</legend>
          <textarea
            className="textarea textarea-primary w-full h-24"
            placeholder="Describe clothing, features, etc."
            value={person.description}
            onChange={(e) =>
              setPerson({ ...person, description: e.target.value })
            }
          ></textarea>
        </fieldset>

        <fieldset className="fieldset">
          <legend className="fieldset-legend">Image</legend>
          <input
            type="file"
            className="file-input file-input-primary w-full"
            onChange={(e) => {
              handleProfileImageChange(e);
            }}
          />
        </fieldset>

        <fieldset className="fieldset">
          <legend className="fieldset-legend">
            Provide 10 Images of the Person
          </legend>
          <input
            type="file"
            className="file-input file-input-primary w-full"
            multiple
            disabled={person.name === ""}
            accept="image/*"
            onChange={(e) => {
              handleRegister(e);
            }}
          />
          <p className="fieldset-label">Use Image with clear face</p>
          <p className="fieldset-label">Person Name is Required</p>
        </fieldset>

        <div className="flex justify-center items-center space-x-2">
          <button
            className="btn btn-primary w-full flex items-center justify-center space-x-2"
            onClick={handleRegisterMissingPerson}
            disabled={!registered}
          >
            <IconMail size={20} />
            <span>Register Missing Person</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default RegisterMissingPerson;
