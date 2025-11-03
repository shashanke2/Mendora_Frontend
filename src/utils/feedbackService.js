import api from "./api"; // use your axios instance

export const submitFeedback = async (providerId, rating, comment) => {
  const token = localStorage.getItem("accessToken");

  const res = await api.post(
    `/feedback/${providerId}`,
    { rating, comment },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};

export const getAverageFeedback = async (providerId) => {
  const res = await api.get(`/feedback/averagefeedback/${providerId}`);
  return res.data;
};
