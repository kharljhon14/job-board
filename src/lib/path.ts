const paths = {
  homePath() {
    return '/';
  },
  viewJobPath(slug: string) {
    return `/jobs/${slug}`;
  },
  createJobPath() {
    return '/jobs/new';
  },
  editJobPath(jobSlug: string) {
    return `/jobs/${jobSlug}/edit`;
  }
};

export default paths;
