# Puppy images (keep in repo)

All images here are part of the project and committed to Git so they are **never lost**.

## Folder structure for puppies

Each **puppy** has their own folder. The folder name must follow:

**`Name Gender Age Price`**

Examples:

- `Kate Female 9 weeks 1000`
- `Jake male 9 weeks 800`
- `Annie Female 9 weeks 1200`

- **Name** – Puppy’s name (one word).
- **Gender** – `Female` or `Male` (or `female` / `male`).
- **Age** – e.g. `9 weeks`, `12 weeks`.
- **Price** – Number only, e.g. `1000`, `1700`.

## Profile photo (main image)

Inside a puppy folder:

- If one image is named **`main`** (e.g. `main.jpg`, `main.png`), that file is used as the **profile photo** on the site.
- If there is no `main` image, the **first image** in the folder (by filename) is used as the profile photo.

All other images in the folder are shown in the puppy’s gallery.

## Other folders

- **Parents and past litters** – General site images (hero, about, logo, etc.). Not used as puppy folders.
- **Reserved** – Ignored for puppy listing.

**Important:** Commit and push `public/images` to GitHub so the live site has the photos. Once pushed, deleting this folder on your PC won’t affect the website—the host (e.g. Vercel) builds from the repo. Run `git add public/images` then `git commit` and `git push`, or use `npm run stage-photos` then commit and push.
