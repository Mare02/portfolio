import { useI18n } from 'vue-i18n';

export function useSanityService() {
  const queries = {
    // Get all projects
    getAllProjects: groq`*[_type == "project"] | order(createdAt desc)`,

    // Get single project by slug
    getProjectBySlug: groq`*[_type == "project" && slug.en.current == $slug][0]`,
  };

  /**
   * Fetch all projects
   * @param {object} options - Query options
   * @param {boolean} options.basicFields - Whether to fetch only basic fields for performance
   * @returns {Promise} Sanity query result
   */
  async function getAllProjects(options = {}) {
    try {
      const query = options.basicFields ? queries.getProjectsBasic : queries.getAllProjects;
      const { data, error } = await useSanityQuery(query);

      if (error.value) {
        console.error('Error fetching projects:', error.value);
        throw error.value;
      }

      return data;
    } catch (err) {
      console.error('Service error in getAllProjects:', err);
      throw err;
    }
  }

  /**
   * Fetch a single project by slug
   * @param {string} slug - Project slug
   * @returns {Promise} Sanity query result
   */
  async function getProjectBySlug(slug) {
    try {
      if (!slug) {
        throw new Error('Project slug is required');
      }

      const { data, error } = await useSanityQuery(queries.getProjectBySlug, { slug });

      if (error.value) {
        console.error('Error fetching project:', error.value);
        throw error.value;
      }

      if (!data.value) {
        throw new Error(`Project with slug "${slug}" not found`);
      }

      return data;
    } catch (err) {
      console.error('Service error in getProjectBySlug:', err);
      throw err;
    }
  }

  /**
   * Get SEO-friendly data for a project
   * @param {object} project - Project object
   * @returns {object} SEO meta data
   */
  function getProjectSeoData(project) {
    if (!project) return {};

    const { locale } = useI18n();
    const { getSanityImageUrl } = useUtils();

    const ogImage = project.coverImage
      ? getSanityImageUrl(project.coverImage.asset._ref)
      : (project.images?.[0] ? getSanityImageUrl(project.images[0].asset._ref) : '');

    return {
      title: project.name?.[locale.value] || project.name?.en || 'Project',
      description: project.description?.[locale.value] || project.description?.en || '',
      ogTitle: project.name?.[locale.value] || project.name?.en || 'Project',
      ogDescription: project.description?.[locale.value] || project.description?.en || '',
      ogImage,
    };
  }


  return {
    // Main data fetching methods
    getAllProjects,
    getProjectBySlug,

    // Helper methods
    getProjectSeoData,
  };
}
