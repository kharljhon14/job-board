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
  },
  viewProfilePath(slug: string) {
    return `/profile/${slug}`;
  }
};

export default paths;
