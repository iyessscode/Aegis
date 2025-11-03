import { UAParser } from "ua-parser-js";

export function getUserAgentInfo(userAgent?: string | null) {
  if (!userAgent)
    return {
      device: "Unknown Device",
      browser: "Unknown Browser",
      os: "Unknown OS",
    };

  const userAgentInfo = UAParser(userAgent);
  if (
    !userAgentInfo.device.type &&
    !userAgentInfo.browser.name &&
    !userAgentInfo.os.name
  )
    return {
      device: "Unknown Device",
      browser: "Unknown Browser",
      os: "Unknown OS",
    };

  return {
    device: userAgentInfo.device.type as string,
    browser: userAgentInfo.browser.name as string,
    os: userAgentInfo.os.name as string,
  };
}
