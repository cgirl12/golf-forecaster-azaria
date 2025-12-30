import Navbar from "@/components/Navbar";

/**
 * Halaman Profil
 * 
 * Berisi biodata pembuat aplikasi.
 */
const Profil = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <Navbar />

      {/* Content */}
      <div className="relative overflow-hidden min-h-[calc(100vh-80px)] flex items-center">
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-1/4 w-72 h-72 bg-secondary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-2xl mx-auto">
            {/* Profile Card */}
            <div className="glass-card rounded-3xl p-8 md:p-12 animate-fade-in text-center">
              {/* Avatar */}
              <div className="mb-8">
                <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center text-5xl font-heading font-bold text-primary-foreground shadow-lg">
                  RAU
                </div>
              </div>

              {/* Name & Title */}
              <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-2">
                Ruth Azaria Ubro
              </h1>
              <p className="text-primary font-medium text-lg mb-6">
                220101144
              </p>

              {/* Bio */}
              <div className="space-y-4 text-muted-foreground mb-8">
                <p>
                  Mahasiswa semester 7 yang sedang mendalami bidang Machine Learning 
                  dan Artificial Intelligence. Aplikasi GolfPredict ini dibuat sebagai UTS 
                  mata kuliah Machine Learning.
                </p>
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="p-4 rounded-xl bg-muted/30">
                  <div className="flex items-center justify-center gap-2 text-primary mb-2">
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                      <path d="M6 12v5c3 3 9 3 12 0v-5" />
                    </svg>
                    <span className="font-medium text-foreground">Universitas</span>
                  </div>
                  <p className="text-sm text-muted-foreground">ITB-STIKOM Ambon</p>
                </div>

                <div className="p-4 rounded-xl bg-muted/30">
                  <div className="flex items-center justify-center gap-2 text-primary mb-2">
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 19.5v-15A2.5 2.5 0 016.5 2H20v20H6.5a2.5 2.5 0 010-5H20" />
                    </svg>
                    <span className="font-medium text-foreground">Mata Kuliah</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Machine Learning</p>
                </div>

                <div className="p-4 rounded-xl bg-muted/30">
                  <div className="flex items-center justify-center gap-2 text-primary mb-2">
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7" />
                    </svg>
                    <span className="font-medium text-foreground">Email</span>
                  </div>
                  <p className="text-sm text-muted-foreground">azaria@gmail.com</p>
                </div>

                <div className="p-4 rounded-xl bg-muted/30">
                  <div className="flex items-center justify-center gap-2 text-primary mb-2">
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M15 22v-4a4.8 4.8 0 00-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 004 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                      <path d="M9 18c-4.51 2-5-2-7-2" />
                    </svg>
                    <span className="font-medium text-foreground">GitHub</span>
                  </div>
                  <p className="text-sm text-muted-foreground">github.com/cgirl12</p>
                </div>
              </div>

              {/* Skills */}
              <div className="border-t border-border/50 pt-6">
                <h3 className="font-heading text-lg font-bold text-foreground mb-4">Keahlian</h3>
                <div className="flex flex-wrap justify-center gap-2">
                  {["Python", "Machine Learning", "React", "TypeScript", "Data Science", "Naive Bayes"].map((skill) => (
                    <span 
                      key={skill}
                      className="px-4 py-2 rounded-full text-sm font-medium bg-primary/10 text-primary"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border/50">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-sm text-muted-foreground">
            © 2024 GolfPredict. Dibuat dengan ❤️ menggunakan React & Tailwind CSS
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Profil;
