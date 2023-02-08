const EditProfile = () => {
  return (
    <div className="p-4">
      <div className="flex items-center space-x-4">
        <div className="w-14 h-14 rounded-full bg-gray-200" />
        <label
          htmlFor="avatar"
          className="cursor-pointer px-3 py-2 border border-gray-200 rounded-md hover:bg-orange-400 hover:text-white t-300"
        >
          Change Avatar
          <input id="avatar" className="hidden" type="file" />
        </label>
      </div>
      <div className="space-y-1 mt-2">
        <label htmlFor="email" className="text-sm">
          Email Address
        </label>
        <input id="email" className="input" type="email" required />
      </div>
      <div className="space-y-1 mt-2">
        <label className="text-sm">Phone number</label>
        <div className="flex w-full">
          <span className="text-sm text-gray-400 border rounded-l-md py-2 px-3 select-none bg-gray-100">
            +82
          </span>
          <input
            className="input rounded-l-none border-l-0 hover:border-l focus:border-l"
            type="number"
            required
          />
        </div>
      </div>
      <button className="button mt-4">Update Profile</button>
    </div>
  );
};

export default EditProfile;
