import React, { useState } from "react";
import { Switch, Input, Button, Divider } from "antd";

const Settings = () => {
  const [username, setUsername] = useState("Kashif");
  const [email, setEmail] = useState("kashif@example.com");
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="max-w-xl mx-auto p-4 space-y-6">
      <h2 className="text-2xl font-bold text-center">⚙️ Settings</h2>

      <div className="space-y-2">
        <label className="block text-sm font-medium">User Name</label>
        <Input value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium">Email</label>
        <Input value={email} disabled />
      </div>

      <Divider />

      <div className="flex justify-between items-center">
        <span className="text-sm font-medium">🌗 Dark Mode</span>
        <Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
      </div>

      <Divider />

      <div className="flex justify-end">
        <Button type="primary">Save Changes</Button>
      </div>
    </div>
  );
};

export default Settings;
