"use client";

import { forwardRef, useId, useMemo, useState } from "react";
import { CheckIcon, EyeIcon, EyeOffIcon, XIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const PasswordInputOrigin = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ onChange, onBlur, name, ...rest }, ref) => {
  const id = useId();
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const toggleVisibility = () => setIsVisible((prev) => !prev);

  const checkStrength = (pass: string) => {
    const requirements = [
      { regex: /.{8,}/, text: "At least 8 characters" },
      { regex: /[0-9]/, text: "At least 1 number" },
      { regex: /[a-z]/, text: "At least 1 lowercase letter" },
      { regex: /[A-Z]/, text: "At least 1 uppercase letter" },
    ];
    return requirements.map((req) => ({
      met: req.regex.test(pass),
      text: req.text,
    }));
  };

  const strength = checkStrength(password);
  const strengthScore = useMemo(
    () => strength.filter((req) => req.met).length,
    [strength]
  );

  const getStrengthColor = (score: number) => {
    if (score === 0) return "bg-border";
    if (score <= 1) return "bg-red-500";
    if (score <= 2) return "bg-orange-500";
    if (score === 3) return "bg-amber-500";
    return "bg-emerald-500";
  };

  const getStrengthText = (score: number) => {
    if (score === 0) return "Enter a password";
    if (score <= 2) return "Weak password";
    if (score === 3) return "Medium password";
    return "Strong password";
  };

  return (
    <div>
      <div className="*:not-first:mt-2">
        <Label htmlFor={id}>Password</Label>
        <div className="relative">
          <Input
            id={id}
            ref={ref}
            name={name}
            type={isVisible ? "text" : "password"}
            placeholder="Password"
            className="pe-9"
            {...rest}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              onChange?.(e);
            }}
            onFocus={() => setIsFocused(true)}
            onBlur={(e) => {
              setIsFocused(false);
              onBlur?.(e);
            }}
            aria-describedby={`${id}-description`}
          />
          <button
            type="button"
            onClick={toggleVisibility}
            className="text-muted-foreground/80 hover:text-foreground absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow]"
            aria-label={isVisible ? "Hide password" : "Show password"}
            aria-pressed={isVisible}
          >
            {isVisible ? <EyeOffIcon size={16} /> : <EyeIcon size={16} />}
          </button>
        </div>
      </div>

      {/* Animated container */}
      <div
        className={`transition-all duration-300 ease-out overflow-hidden ${
          isFocused ? "max-h-96 opacity-100 mt-3" : "max-h-0 opacity-0 mt-0"
        }`}
      >
        <div
          className="bg-border mb-4 h-1 w-full overflow-hidden rounded-full"
          role="progressbar"
          aria-valuenow={strengthScore}
          aria-valuemin={0}
          aria-valuemax={4}
          aria-label="Password strength"
        >
          <div
            className={`h-full ${getStrengthColor(
              strengthScore
            )} transition-all duration-500 ease-out`}
            style={{ width: `${(strengthScore / 4) * 100}%` }}
          />
        </div>

        <p
          id={`${id}-description`}
          className="text-foreground mb-2 text-sm font-medium"
        >
          {getStrengthText(strengthScore)}. Must contain:
        </p>

        <ul className="space-y-1.5" aria-label="Password requirements">
          {strength.map((req, index) => (
            <li key={index} className="flex items-center gap-2">
              {req.met ? (
                <CheckIcon size={16} className="text-emerald-500" />
              ) : (
                <XIcon size={16} className="text-muted-foreground/80" />
              )}
              <span
                className={`text-xs ${
                  req.met ? "text-emerald-600" : "text-muted-foreground"
                }`}
              >
                {req.text}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
});

PasswordInputOrigin.displayName = "PasswordInputOrigin";
export default PasswordInputOrigin;