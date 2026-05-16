import { axiosInstance } from "../lib/axios";

export const getArticles = async (lang = "id") => {
  try {
    const res = await axiosInstance.get("/artikel", {
      params: { lang },
    });

    return res.data.data.reverse();
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const getArticleBySlug = async (slug, lang = "id") => {
  try {
    const res = await axiosInstance.get(`/artikel/${slug}`, {
      params: { lang },
    });
    return res.data.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const viewArticle = async (id) => {
  try {
    const res = await axiosInstance.post(`/artikel/article-viewer/${id}`);
    return res.data.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const getImageArticle = async (imageName) => {
  try {
    const res = await axiosInstance.get(`/artikel/image/${imageName}`);
    return res.data;
  } catch (err) {
    console.log("Error loading image:", err);
    throw err; // Re-throw to let caller handle
  }
};

export const getSubImageArticle = async (imageName) => {
  try {
    const res = await axiosInstance.get(
      `/artikel/imageSubArtikel/${imageName}`
    );
    return res.data;
  } catch (err) {
    console.log("Error loading sub image:", err);
    throw err; // Re-throw to let caller handle
  }
};
