"use client";
import Head from 'next/head';
import { useState } from "react";
import { User } from "../register/types";
import { postFetch } from "../lib/apiCall";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "../../redux/store";
import { setUserss } from "@/redux/slices/userSlice";

const Login = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User>({ email: "", password: "" });
  const dispatch = useDispatch();

  const handleLogin = () => {
    setLoading(true);
    postFetch("/authentication/login", {
      email: user.email.toLowerCase(),
      password: user.password.toLowerCase(),
    })
      .then((response: any) => {
        setLoading(false);

        if (response?.response?.data?.error) {
          toast(response.response.data.error, { theme: "dark" });
          return;
        }
        if (response?.response?.data?.message) {
          toast(response.response.data.message, { theme: "dark" });
          return;
        }
        if (response?.data?.status === "unapproved") {
          toast("Please wait for approval", { theme: "dark" });
          return;
        }

        toast("Login Successful", { theme: "dark" });
        dispatch(setUserss(response.data));

        if (response?.data?.role === "superuser") {
          router.push(`/individuals`);
        } else {
          router.push(`/dashboard/${response?.data?._id}`);
        }
        router.refresh();
      })
      .catch((error: any) => {
        setLoading(false);
        console.error("An error occurred:", error);
        toast("An error occurred. Please try again later.", { theme: "dark" });
      });
  };

  return (
    <>
      <Head>
        <title>KOL Cooperative Society</title>
        <meta name="description" content="KOL Cooperative Society Ibadan" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600&family=Source+Sans+3:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </Head>

      <ToastContainer />

      <div style={styles.wrap}>
        <div style={styles.card}>

          {/* Emblem */}
          <div style={styles.emblem}>
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <path
                d="M14 3L4 8v6c0 5.25 4.27 10.16 10 11.33C19.73 24.16 24 19.25 24 14V8L14 3z"
                fill="white"
                fillOpacity="0.9"
              />
              <path
                d="M10 14l3 3 5-5"
                stroke="#3C3489"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <h1 style={styles.title}>K.O.L. Cooperative Society</h1>
          <p style={styles.subtitle}>Sign in to your member account</p>

          <div style={styles.divider} />

          <div style={styles.notice}>
            For assistance, please call our support line or visit the nearest branch office.
          </div>

          {/* Email */}
          <div style={styles.field}>
            <label htmlFor="email" style={styles.label}>
              Email Address
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="e.g. john.doe@email.com"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              style={styles.input}
              onFocus={(e) => (e.target.style.borderColor = "#534AB7")}
              onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
            />
          </div>

          {/* Password */}
          <div style={styles.field}>
            <label htmlFor="password" style={styles.label}>
              Password
            </label>
            <div style={styles.inputWrap}>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="Enter your password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                style={{ ...styles.input, paddingRight: "52px" }}
                onFocus={(e) => (e.target.style.borderColor = "#534AB7")}
                onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={styles.eyeBtn}
                title="Toggle password visibility"
              >
                {showPassword ? (
                  // Eye-off icon
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  // Eye icon
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="button"
            onClick={handleLogin}
            disabled={loading}
            style={{
              ...styles.btn,
              ...(loading ? styles.btnDisabled : {}),
            }}
          >
            {loading ? (
              <span style={styles.btnLoading}>
                <span style={styles.spinner} />
                Signing in...
              </span>
            ) : (
              "Sign In to My Account"
            )}
          </button>

          {/* Links */}
          <div style={styles.links}>
            <a href="/forgot" style={styles.link}>
              Forgot your password?
            </a>
          </div>

          <div style={styles.footer}>
            Not yet a member?&nbsp;
            <a href="/register" style={styles.link}>
              Register here
            </a>
          </div>

        </div>
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
};

const styles: Record<string, React.CSSProperties> = {
  wrap: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "2rem 1rem",
    fontFamily: "'Source Sans 3', sans-serif",
    backgroundColor: "#f5f4f9",
    width: "100%",
  },
  card: {
    width: "100%",
    maxWidth: "460px",
    backgroundColor: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: "16px",
    padding: "2.5rem",
    boxShadow: "0 4px 24px rgba(60,52,137,0.08)",
  },
  emblem: {
    width: "56px",
    height: "56px",
    borderRadius: "50%",
    backgroundColor: "#3C3489",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "1.5rem",
  },
  title: {
    fontFamily: "'Playfair Display', serif",
    fontSize: "22px",
    fontWeight: 600,
    color: "#1a1a2e",
    margin: "0 0 4px",
    lineHeight: 1.2,
  },
  subtitle: {
    fontSize: "15px",
    color: "#6b7280",
    margin: "0 0 1.75rem",
  },
  divider: {
    height: "1px",
    backgroundColor: "#e5e7eb",
    marginBottom: "1.5rem",
  },
  notice: {
    backgroundColor: "#f5f4f9",
    borderLeft: "3px solid #534AB7",
    borderRadius: "0 8px 8px 0",
    padding: "10px 14px",
    fontSize: "13px",
    color: "#6b7280",
    marginBottom: "1.5rem",
    lineHeight: 1.5,
  },
  field: {
    marginBottom: "1.25rem",
  },
  label: {
    display: "block",
    fontSize: "15px",
    fontWeight: 500,
    color: "#374151",
    marginBottom: "8px",
  },
  inputWrap: {
    position: "relative",
  },
  input: {
    width: "100%",
    boxSizing: "border-box" as const,
    fontFamily: "'Source Sans 3', sans-serif",
    fontSize: "16px",
    padding: "13px 16px",
    border: "1.5px solid #d1d5db",
    borderRadius: "8px",
    backgroundColor: "#fafafa",
    color: "#111827",
    outline: "none",
    transition: "border-color 0.15s",
  },
  eyeBtn: {
    position: "absolute",
    right: "14px",
    top: "50%",
    transform: "translateY(-50%)",
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "4px",
    color: "#9ca3af",
    display: "flex",
    alignItems: "center",
  },
  btn: {
    width: "100%",
    padding: "15px",
    fontFamily: "'Source Sans 3', sans-serif",
    fontSize: "17px",
    fontWeight: 600,
    color: "#ffffff",
    backgroundColor: "#3C3489",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    marginTop: "0.5rem",
    letterSpacing: "0.02em",
    transition: "background 0.15s",
  },
  btnDisabled: {
    backgroundColor: "#9ca3af",
    cursor: "not-allowed",
  },
  btnLoading: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
  },
  spinner: {
    width: "18px",
    height: "18px",
    border: "2.5px solid rgba(255,255,255,0.35)",
    borderTopColor: "#ffffff",
    borderRadius: "50%",
    animation: "spin 0.7s linear infinite",
    display: "inline-block",
  },
  links: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "1rem",
    fontSize: "14px",
  },
  link: {
    color: "#534AB7",
    textDecoration: "none",
    fontWeight: 500,
  },
  footer: {
    textAlign: "center",
    marginTop: "1.5rem",
    paddingTop: "1.25rem",
    borderTop: "1px solid #e5e7eb",
    fontSize: "14px",
    color: "#6b7280",
  },
};

export default Login;