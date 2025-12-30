import Navbar from "@/components/Navbar";
import PredictionForm from "@/components/PredictionForm";

/**
 * Halaman Prediksi (Index)
 * 
 * Halaman utama aplikasi yang menampilkan form prediksi golf
 * berdasarkan kondisi cuaca menggunakan algoritma Naive Bayes.
 */
const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 py-12 md:py-16">
          {/* Header */}
          <div className="text-center mb-10 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="3" />
                <path d="M12 2v4M12 18v4" />
              </svg>
              Prediksi Cerdas dengan Naive Bayes
            </div>
            <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Prediksi Bermain{" "}
              <span className="text-primary">Golf</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Masukkan kondisi cuaca untuk mengetahui probabilitas apakah cocok 
              untuk bermain golf hari ini.
            </p>
          </div>

          {/* Prediction Form */}
          <div className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <PredictionForm />
          </div>

          {/* Algorithm Explanation */}
          <div className="mt-16 max-w-3xl mx-auto">
            <div className="glass-card rounded-2xl p-6 md:p-8">
              <h3 className="font-heading text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <svg className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                Cara Kerja Algoritma
              </h3>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Aplikasi ini menggunakan algoritma <strong className="text-foreground">Naive Bayes Classifier</strong> untuk 
                  memprediksi apakah kondisi cuaca cocok untuk bermain golf.
                </p>
                <div className="bg-muted/50 rounded-lg p-4">
                  <p className="font-mono text-sm text-foreground">
                    P(Golf|Kondisi) = P(Kondisi|Golf) × P(Golf) / P(Kondisi)
                  </p>
                </div>
                <ul className="list-disc list-inside space-y-2 text-sm">
                  <li><strong>P(Golf|Kondisi)</strong> - Probabilitas bermain golf given kondisi cuaca</li>
                  <li><strong>P(Kondisi|Golf)</strong> - Likelihood kondisi cuaca given bermain golf</li>
                  <li><strong>P(Golf)</strong> - Prior probability bermain golf dari data training</li>
                  <li><strong>Laplace Smoothing</strong> - Diterapkan untuk menghindari probabilitas 0</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border/50 mt-16">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-sm text-muted-foreground">
            © 2024 GolfPredict. Dibuat dengan ❤️ menggunakan React & Tailwind CSS
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
