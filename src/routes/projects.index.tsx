import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, ArrowRight, MapPin, Play } from "lucide-react";
import { projects } from "@/data/projects";
import { Stagger, StaggerItem } from "@/components/motion-primitives";
import { BtnLink, PageHero, Section, SectionHeading } from "@/components/ui-kit";

/**
 * KNFT project media now uses Google Drive links only.
 * Local src/assets image/video imports have been removed.
 * Each media item stays inside its own Drive category.
 *
 * Google Drive files must be shared as "Anyone with the link — Viewer"
 * for the embedded player to work for public website visitors.
 */
type DriveCategory = { title: string; ids: string[] };

const driveCategories: DriveCategory[] = [
  { title: "Aadur Malavanthangal Lake", ids: [
    "1Atl30HZT8wu8_o2LeAOKC2OndmByMvLI",
  ] },
  { title: "Erumananthangal Lake", ids: [
    "12ofIsOVa-5XUdcYZsSWdqnoNPPQEs35f", "14wCcHnmM0kzHveZx2hscDpMP7eaRROdw", "17OQ3ZwWNT1m2LNG4pdH-4CHqK50JzgDZ", "18foh5dYc5lHxRnOMWbLOUl23OYfqE26G",
    "1Ojxv1aomgDfas-sdzwq5Y_3Arj26yogl", "1cbuYr0MhwH8qyInyDlyulUSGobivJpuk", "1qeF20Tb-nX2vLus39SFdqmqFU2hfZciX", "1yOoyqjZO9CxWMeHip3LqoL2cJ8K3R3NC",
  ] },
  { title: "Lake Restoration — Vertical Hero Video", ids: [
    "1s-d-hWtodATrCoCBGAIm_t0bclg-s2AL",
  ] },
  { title: "Lake Restoration — Hero Videos", ids: [
    "1a4YCOi_az9RBtNpRmmcu9kNFDm3wWduW", "1fIp54zrBvz9gSA6BZQxpFe9x1kYrYH7v",
  ] },
  { title: "Lake Restoration — Site Inspections", ids: [
    "1AbiUP7dzYNAzdSYpHlPVO642HISMUorV", "1CpuArNo_axVtGjZ5m8KyoJ2Z23ldn0Bu", "1TeuX-IiBTT34KAgc8D7q5UfzBPru_j8E", "1YI8zw8Q1Pmz9uNUif0R5AlaH2ae2eIYo",
    "1rQQu9ZvrrweyzECXfFlVPXwZ3S7WS-iP",
  ] },
  { title: "Muthampalayam Lakes", ids: [
    "13QQK4l7-DLx5CZBhRtRjJx8Zr0D__VEe", "1CwEjvjBJdFAALWJl79kahujCcZZPOvRD", "1JvS1Xrr6-i-989alaPiogfczZHsjo2tp", "1ODLaYSkIh_kt1uVxMYKTcLd0USuX0wVX",
    "1WCELTuL-2rz0BIr4gulmyS2Cwuj9FiIb", "1_mOAcPl862gizx94FxOig_AJY_aL_URO", "1ipvmQHb-CrCCNepLyAZPIVs8KxCY0hxO", "1rhhUlCflE4gKqJWN-aLkA_VpM11qRhMQ",
    "1t9FriB-zdp4udelNdcak8tpmI4FOaeym", "1w-qGoW4yOOBlRzF6Iml-m4-87yL6bzOe", "1zfXpMEAWrIwzaHX47jur8EDcUYeAdF39",
  ] },
  { title: "Disaster Relief", ids: [
    "1-Hzr3gxNsqp-SITzgNOlW9aaVD1RTe0z", "13HER4lfuz-ZhOOnw7YL_msgXMxdXeQx1", "13cvOWjirXIW6E3l6iw__0-j4Q__vpM0z", "14Z0PLNEjX9ObGKH2oVoZoph1Atz6POBX",
    "15sHZxU9rudutV4p5J7CSo_Lz5wwKTC1y", "15zZOAfVs6qWc8XcXzCL4pxTdxY7glrie", "16Ax3tHOXD_ndmOjcSp5KTXo1c4Dub2lL", "17UCbIsvkIhLmkgTG6j-vAuCgWHzfdK8B",
    "17qD0QqDJRm9QBbbz23DsTGyCNc9cB-KM", "18oObQ_hJwVEPrfMEtXPz-GaRLgUGmjqO", "193J7ci69OCvRArwjH3_xvV4RdIIqKueZ", "19EQYKnpCOTgRbebIiZ04S5Xj-goDhXRU",
    "1C1IdS0d7mmWoWHzZbug_uYW1Y14v5y_M", "1CSl4R6sVzu2-Gq49a4pEu0SrMkVJ0kih", "1Ch5uWX4X1cLTXgbn-bVZvZPBdEFwpD2b", "1Ct4olSkjuY7LYkn8x6onAd3YpiFP7Ye9",
    "1DPwIO3hvWBkca95MAFt51P5evmwiUUnv", "1Dqr-yCRqEgVYUPmMUtTlEGO3oQ1DSdPr", "1EGh8MEY9-qT2O5CThtvt5bvALTRCAP1L", "1ETAwL9dD-g8rnNCLiEbt4Do_q_NV0J6v",
    "1F2rkiA0qwl8PVmUnJGd7qbPChNaMa7BM", "1FEn_vPT7Ox_uuRmMXVQpdt3b6Gl6rBmm", "1FFKU68ZnhfepFKJSVYIr6hG5wPp-llw7", "1FsZOPiAzjh1iawmeVLfmW6vS1WEv59B1",
    "1HFVGQHKDoI_KtINrzBmeFjQIvEeWYYQa", "1JPWYZc3QQsNyRJ7yxPdUTSCsNNS224IR", "1Ndl1qX1sPVWHg6NjGmqsmNZ_JLCXySJS", "1NsKWpABTrxKMQuav7wkBfDre_OfOV65h",
    "1OOyH5YuO6S3RqPdbs0RfJTSCZ60Sdkbp", "1PG-I9aJ3XliRo6cTWm5U9XmLbtXVH2NV", "1Q1H-2hWvUBKGC9rbzoIGw8xQByyCbKC5", "1TZqg3xqu4ihyG2YdluaJ6acEmqpDGSVT",
    "1ULeLcJvd3jLGIL9JpwCTrCt_3-Ewh_J0", "1VTDBslS_q2R0EySaY4h8dhC7iBpcxUBm", "1VcBRCP3c-pTrsqOZxhVMPrRQe6cbXYLE", "1VlM6C13BLcAf_rgm90qnD-KRr9KN_RPn",
    "1W6YNN-ru3c7f9xVREi1koc7wJjbkOjjk", "1X3KI1BFdLQim9fw4lxBYSJIhKiirVaow", "1X6cdfuzb-_R3ttgy7S2aC_Ug1JLwQ9XC", "1X9LyvQBSpdva9gXKkpqbawY0WNMHwmrM",
    "1XH_AwL7DAaQh5Fn9rSZ6u9CDI2fonaMr", "1Y2gscpjhCEDccgVpZab6IPlhirb7aO6n", "1YYIIdrqXwYdrRhMKIceK526gcAbN3awH", "1ZZ8txhkK8yaAmkpiENS1q87ZCbBQTbzO",
    "1Zs0hY3lk7axeIBa-xxJKyQrrc5PqirIv", "1_abuuMbU3jrlLyuhdJL6LaS0obgE8RSl", "1aSjNE07W0WJIAg5HU60b3pkueX2YuUWY", "1aVnLOCQO_X2FF6BhalsbbmoGsLoGaDan",
    "1bAATB-D5dMedA5tdoCzaA5pedBYE0tbQ", "1beFOMajX9tyx4i2lgalTbi3oMTgheley", "1cBwzMoFMhIeBaXQH37LacOfhcX5EmKjQ", "1cHy83F9jHT26CInooUje0lMNiW-fuX7u",
    "1dXNGwfQcMcT5Jfu26rhgmMocJrpF-w_f", "1eP70KT19dWjkUtQyvItShNYBI7H-fFd-", "1f_JVLDjzQ-nFOq8AJRcVUCqyIwLmKTQL", "1fm4R_HWofOpE4jkLrSLkfkatDAEZW-9B",
    "1g8VqWKNS6rYfY1dXr76jzF5B8-FaOMg6", "1iYpGD00ya1Ut0laTPf3yZEG8IVZlCZv8", "1k0JcrF2Q7NwCgys4fJO5aFtJlZHaxaf3", "1lptOsXO9SscMQHYxjC9V-fCZtBjTAg-w",
    "1m9wv5dV3uOepDRAxSa1M7eQc01AjOAuP", "1oQnxknUNBO5XJxsk_3xVuj0pZG1uk1XW", "1oeytDCJ80pskJ5ExgnhVyJ0-A_k9PEap", "1on10d9wEe2FpDC78EcbZxWxrg6jELWcf",
    "1oth4Fdf94Kj6bg2sjDRx2kPMkw7Ab55O", "1rKB3hb5Wb0dSkvgzJj18bt3wE6keZfKq", "1u0ceg0hDkvwbow88weYlzy7rsWWNpmcK", "1uuYPAHSMzu3_1F60kpXtgK3pj7u2S-I9",
    "1vDRgFG8Hjpe60xNASwyn5xIyerXqD3VC", "1vzWqH99ku0SvJNxmIOIlSrMq4VzkwCQz", "1wIUveVpbRQv-zSyaVfiax1JcZ6C5Ygs8", "1zd9HLLttT9H2t9OT1h9gUJiu8wx_qy5g",
    "1zipCQDgm2fhpO5NmaxiZEaiAQ4lZ7AsT",
  ] },
  { title: "Blood Donation", ids: [
    "18ik13DdhrMtjb3oUjAmzEEQpUWLBhEV_", "1OFuzWCOwSNdQWmLcp8-dbFMvgK9Rfg1n", "1fe1xD0CBlhseaQfbgML9Kb0YKow0PT22", "1jkhsVXomvL6WzeE_DZ-pTLcXF4m8Q2Fd",
    "1rfGjhOclTZqHGEb06rHMGP4aN1ShJC0K",
  ] },
  { title: "Education", ids: [
    "12RMFRQJaHc3mGKxatXvgL3J4jCQEDDfM", "19Yo3c2c2dnaiIfACTqWgmebAb3vc8TX5", "1Dup1zU-SE88deMzkvXni5Gg370xy6fSq", "1FvjM0ChJxWJ0fsGVaolXIeGQrhsHcQeM",
    "1QHyrK8GmK1YxuCmS0j_cl5NzoqHeYGFL", "1RpAvRwRz9w7Xg5YNNqcvQsVSBybzzFsn", "1ZpYcaBJWy2p0GFIGFui4rf-zOj6IfH0m", "1_v_NO6wysNCYAEy3cy1xbZqxSgrs7rmK",
    "1eQg_gLBuPKroJ9SX9-PsntaCzu5kNZuQ", "1eobO-ryfIG00uFadQPgmvFkccVcr3x1-", "1khtMy4Xzmw0jUrDVHD_Bjx9z-spP0u6L", "1ocaaQKMVluw_weuFX-bBYS1jqLE3XAUe",
    "1wCJkSpK3l93ewDPX4Ii9fkNdkfi5X8_w",
  ] },
  { title: "Career Support", ids: [
    "14eEl4wj0dMl9BG8K2Yjjj4VHNPD1-txP", "16Se6DGuYyfZAdVBOHHTCFSUGMoodLNNC", "17f-y9xaWd8MotFf3DCrYUms5Hx3ZSnmC", "1Al_QAa4HDF9R0njiaOOA_RW82AR1Xfk4",
    "1AzDytxb9tVq_dGI1WDFDQdkfPP4Id8MJ", "1GEU4qMS0JNwxp9w-YIpGBekKtx3-ligi", "1GXQa7ngNNpAfPSv5eLxK3B7bH_hsXX0b", "1HbfJ30P59wXs2b_qd8_LVlWnTSwShxoc",
    "1HyGSRgpJmHO1Z_p1rjdPWsL8_NT9WPr8", "1KnP9ASM8zT2L7l_gCAnQaN4_73O84tpv", "1NwS6xLsx_x3Pb0BYNwohW14ysCI39-lC", "1RPALZd1goNNLWOqbDiAoyX3S-Qgmt6Mx",
    "1U5kaus5oVevO8KUkoSAIvp04u-eQTI0p", "1UdS-g73A08QjLFcjOQKcGYlbVvW-wJXA", "1bZbaJllOY6yQZn8rq2C1N4C-VvAKzxcO", "1i4icJcDRtp9w_v23w00JKhIBeQYD6Cpg",
    "1iFHXlueEeLVBPLSIHenQBGWF25ye8gVT", "1iJzghoeYqLOLgKZ4UBR5zl7K5Ld49d-E", "1mqLj-r5nqFcu2WIOzHUwtBB_RZUZS0ck", "1nWXrR2jwi9GlJKe0XwNQJK323_hgmxaR",
    "1okZGeqQ1uS-09U4TgXbObrBufN7B7W1L", "1pexKGfbAJ3YPYwLnXg4o_hQrccNQEQaG", "1qBtC25L1RpxiMDCR7ZgPTfmaxGsw8nlM", "1rQnkvV1iCfKZ97nI8mYv4VtyMkDzgnBN",
    "1tsY3Md9RLlj-MHb2I73PTApmsDtXGuYK",
  ] },
  { title: "Projects & Impact", ids: [
    "13DVB7DdGn04_VNr0vQpK9ZaNDCUe3BQ2", "15a7MHpLwEOuQYEXXkodRmvQ1-b4_7SUn", "17jVP1UcSDxgzeDOzchVRn34dlyqXZ58C", "1937QdP_d-I0Ey9SFBfx4d80Fdx4NYJcA",
    "1BGIGwsww2FD0Z244JxZPnQ_hG6S9DW-n", "1DVEdCT1sGVTWw5u7jLn70pALWRVx8UI7", "1ELya9HyK4FseXtpmiTYtF81D29iHQNRa", "1Fmzo7xIoFPh5KQqOjMQXDnQuG5VLIvrZ",
    "1IVN-dgj3N1oaQZR7eEFeC3wgFCK92dmP", "1JF0HmLmrmwFHcwiHfC8HpM59jT4Qh5GA", "1LKKyY7S0Z33Bp9tpCOEYIBLSIMoDUjTp", "1MrJjUDkCN1_5E3eSEiBf_fC1B9Kmw8cJ",
    "1NW4vXAMCS3AR8cqGzV7KIaDOp2SOwFTs", "1S7tozZwH_5bHSsYfctZCnVuXiqRI2ul1", "1SFrBX9QDp02cnbp2HDd-REmIPntf9Onx", "1XEgDs2T2_TNNFqFfc_ZjfyOQ7PHNtQpj",
    "1XmJYUYh8OCN1OwBnUCZ_pe3KUg8sTzr3", "1ZBAF-_S6lLlo4VvC6j8p2jv-SsAjoAwT", "1bEjYUMw6oTZ-a143mJIts8x8a5QI3p3y", "1c7M-yiWBEw4xxCwHpp05Ft8lGf2wllNH",
    "1e97qvcpyKw8jXziPPgh_gBXdolytIvUh", "1gYUF6aDcIguOe4N3TmlFbSsjYyLVWWX1", "1iFmmxDAzItq3V7tiq_fv1lAy-36FZKWm", "1sQ2tWvUCeTqBbV4X9Vb27c_kdOIUeRZm",
    "1xhuLSxebw8tcDC2vveZtfZdh8dXeUw3S",
  ] },
  { title: "Tree Plantation", ids: [
    "16_cu7yzyE1g-QNRPjOWB4u8Y9hBG8zTg", "1Aza6QgY_g_qNUrcMU6KxbnsdbjaKTg69", "1Q2BylCEjp0wvDqaXo-ULqDbNtqiHaVPG", "1bLITmuYMbrueSlG8kvSAXQ76atqUSluv",
    "1rjuAHwHx1nmQf_BhHKzjVX-5ilV4dpt9", "1uJ2LgJfQ0gIcjnmxadVh1yyrE4xulgeq", "1vEHKDL6wx7F2vjP87-M61PpTmDFr7-5l", "1xwmbxla7rVAlxFId0DgEyJ6l28E0o5t9",
  ] },
  { title: "About KNFT — Horizontal Hero Video", ids: [
    "1-3Z2UQQerhD4qH8w9mkpCPSHgTuOFqOY",
  ] },
  { title: "About KNFT — Vertical Hero Videos", ids: [
    "1oD2iwdrgMGF9OMjbIonBBTvaUgQbsfkw", "1xez7Tq-RCdwutuZkDwJN7Yzwc56MOEW0",
  ] },
  { title: "KNFT Gallery", ids: [
    "1-2pkWLOqc_Scm9MJQOLAf9h-_xqHAIi1", "1-60v8T_Cmu9q5xVax1zIiEQNaO2ShkOc", "1-EP8Odg34Zun9kqMuwdetH0bbBTSrTOD", "10MRkgeDK8BJFsCPzvM0atWgoiARHFhtP",
    "14dragXyYIfzBfbEM8o4OGXZjl_OVygWu", "14hjDkzmFmmVPFFpXYthhq71WmTGHVnPT", "15MgR31ztO7Bp59tmxnpDEujUR1GhVsjZ", "15sE92aOjySQ8zzM_BbzL4y7X9XcPbqm8",
    "17XzadIi_XrrvC4M88WkTLrAeNn4eoYWt", "17dT78IiL4IQorSoEOf5P3QxM2u54Ex0s", "18cTyWWVYQaRIUAs_WOGAAoWfsnGRZO9s", "19TIjoQUYxWOnnDRrUOYsnvUVM_2yGX95",
    "19Z1Uq80TYmfP5Yf_QEPBNXd9GSt_ogMy", "1CGf3m7PinIOkT5O7W40ugO59N9U34xUp", "1Ck7_qejI1mjrKeWwLyUuHbuhW9YaT3KS", "1ClOx6ENiByWnqzbJYXaVYR9jQRk1lp44",
    "1DWPnfmve7vKJqaMQq039vxl8F-ehwYJS", "1DYlIB2Uln6Esq1KzwHTE4S2h_38yqzun", "1Dhqpd65sksUJ_BNK_vr54o8WJdFRpINn", "1DjppE4mISMdfWSAt_bu8qInH1QMGPT5A",
    "1FgRjOvcRpKVlDR2SiIW0gHxy63s3y3Fe", "1GdLyjP2iVX90QiNtzg23VYDGdR3x5_PC", "1MGIt--y4ubfN1d6LJOdFSTv4d4vFP2Dp", "1PNuCoa7vQIn1zXlhALzGc_zoACyhvxU1",
    "1RvHWeS49eVzDJTTn5Z6E4cTOXrhIawxO", "1SgXesrLXgcQn5to2tLOYU7GcnJCEdqn1", "1TcGyc4eNFH8Dn06gDBj4j3c8WWIVQkmv", "1U_Mr7BxG5FXCq-l0yjQHRdxVv6eHl5VA",
    "1VpF-45N3O9ABaft6bGwAmAPw4XhbzxoF", "1W-QdXKhwndEXsREhX5ZTB2Xg9D7ELigA", "1YY5dYE_BWCnJMPv1m3rhMGsgllbAACi4", "1ZySrLacWRoeOqmkTifLp0WAY6CKMDDfJ",
    "1_laBdcR4cnYi_EwwbE6R5P09A33eT_ri", "1c8pfhmsZZcY5qguUpkymT5iXaPj8YJqS", "1cLtVvbTwvoEt0f1jBhGUZR0NgOlbAJ1t", "1eABGHHe1_MewjODKUHu5itGXafa55I4N",
    "1f3n7NQFpBNnrThoh7ISUP6nw0p3ZMZjn", "1i4FOwrJCJO-bYgnmDo0MmV8qVUX9xNj7", "1jFCUBnEB1tG32KETg_3iSabLiutCCazZ", "1jSeGBiBgNAl9CcNfd1QuucOkSry6sS4f",
    "1jhpv6y4T1JJKKrZhd0fIqtUOpWl348dR", "1l1O29uKoCjdr_p6n84355zocJHXAemrT", "1lYzp2cA37NTDCMCtM492IXhSisilR_QF", "1ldEB7GWZz-17HuHo7BEyGnN2rqS7auRN",
    "1o30fH6KlMrf_RrhJgvjCX4Dk59ZuIZRp", "1o7cU07j4e0HQnr1Jkj9UwNs3FRzEojf1", "1oB0BqD-u6KAc13aParnTG_UWsghMH_mG", "1ooxDPi4uU4FwJjZQNWNjpcFRdnHSFypJ",
    "1pzb8Us3i00QV_k465PXJKCc8MIkhKYFX", "1qKS7JW4V2lK1TXb6XkEEdWFdNp1uGZTC", "1tf2EqUa7YXLXcuKhF0156twGbMILdRhd", "1uJv0UhPUxgeO717s67ABChpBETt8m76D",
    "1vHEsRdX3DAVWLpd3m0KHRLLH8RNHQM4M", "1vaVzcqz6HF7Z-4ziKOc55fqC7_o2IcW7", "1wfS_fHtL3_25fLU45FOsrU5DQg5pKH2F", "1x2uQI5K68HLcxbRFzBx1Jg-NDJhZZaAr",
    "1x5X9nDICZjldS1vs9HxhqajKFBZRI3aq", "1xve99E_DNUhCV_oFsFRu465EKJk-aCOp", "1yBKc5GwiUFnL1WyZhE4eqMD4cAAn9kCj", "1yRnEHIv3TMf4X4fWgt5Fc_MjTJLrPqH6",
    "1yYz7LmPKGPZnrVzYspOjdcBJTHEBgVaP", "1zSSjQ3yHQig2ipIfUm0o7MnG5n77P6AG",
  ] },
  { title: "Sports — Karate", ids: [
    "112QwJGVRDxxOZZ9Q7wPCewwIY0BG_qLP",
  ] },
  { title: "Sports — Malkhamb", ids: [
    "1-RwgAWwqSxBiF8L4AzzP1ZvEQJ3MhCT_", "1-XbBQTnaWXuqiRNouAQDLMDOwbDb-M8y", "106ioxdM67Sulw1kHzZt8I9lvI5yiGQtY", "10I0M4N_It7wlhZLapJ9lxNUuGkH_lnaV",
    "10geyEAOsvbB6O4fNSTNtvXBSz2MOFbId", "10sUiSyEWM3xidVMU0G_hnY4m1Et5X6OH", "10vPsj1SnAD0_IwtLA2J8MJ05WvSRt0cx", "11aAsZLZzh5asAupZgRFKrgxWGAfOvcpV",
    "13cq27ZpaDAyjLrjs0fZkg7C7m8uA8x1u", "143NbtzTQCGo4-AWJ3gMdu0-_ha3JawYJ", "14MY5-X76Brt2Y4KOAUm8TNz7xPpp2Vpd", "14NsRS5CRxxnwDrmmoOVW9B_EgC5JDXLc",
    "14Vb_9dKjA1OvmkN80Dh8ETcCnYjKN_T-", "14mdnqgkWkrntMfijxSN96hHRK8KOJqNZ", "14oqTcVzSwQH-65AabPO9NLbG1QL0mhK7", "16zg2WN22sguQsCSwIk687H1VEUVO6GHj",
    "17XygoyzLDGt4gX1YcvjgAsmv6mCTI-U-", "17aLGZ4dIfkY0Ap93aPbt48Nexw63voza", "17ulr62M1uZohrf8S9uuwj_BVos9jMmn3", "18Q16ubv3NTGjrskkBdgiF03M7PeWE85K",
    "18bwAoMkX30gmjRuRPkLEl59ZqRXmXZlx", "18qjAFZ87pMYJSpmAyQBeNTsEvMJCoyXS", "190RLIocHTJbpNLEqHDLY67YY1vW5gTuD", "191LsOhdEbD7XvgrPngHWVHFUSPG47jKE",
    "197eDhoP2Xh_bpr_gLyQIdCoFSjVGmrZw", "1AcC3npzQv2pHbXhE0fQWWJhUMYOjVGsC", "1BamJH5WtVlLFwXWJl5PF5NiZ98qgslYB", "1C6N3s6bs7xqW5HkwFg8dGCEQmjapdZkC",
    "1CGFKjBB_0BwD85ZfLvVPdDil4Kvm4QNQ", "1Cox2DoiFUhB0GkYlzzfMUiRym4goLzMX", "1CxLMO_088P3ZJ6U9UIKrPPTomub1C0EI", "1DGNGuJazSZUrceLkl_jKM7IJZ5afn8e6",
    "1DMhgT4sU4cPnv3PV4WL94G575e8B7AGg", "1DkIigXhkoMh7uRWl19dVquTaY7BoacC8", "1E0-sPo6wLj9ovfjNpvYFyh82mFvrxTrh", "1E4iWqEXfHCQYbUEuHpMCYdsQ3Jf5jDvT",
    "1EB5y7m1w8QLQ3drJxcKT1nVBj_DLzaJ-", "1ECvTyIKvHhP8-EKcYYvIf2NvwfsM1GiZ", "1F6d92I3Ly-8GNfW2Ibk1TQhrwNyH9Hf6", "1GBleDQ6D-vzeHu6Kcx7YkweGkScC5GKC",
    "1GsrsSkNQ6kbIKk_hlYrqKESJ54kHgXKk", "1H0yJmTS3z63wlmbLljsyxQWla063kr7e", "1H9_spn0lSODLa5vLhoA-uq0-s-KfUJyC", "1I0svd4t9g_FXGRgdbvQuu8W5ujqVkS1H",
    "1I1lPoyiMDCKjuAGFF_XQMzBSso8WmyPo", "1IHCzqbIaJINI14XdTa6XkJjh5huPjhK8", "1IdzA2kVg-MYXN-0k9FzgZOgOtaT5q1La", "1IuMw1GyARvTshvOzEE0xVIVJqTm13y1g",
    "1J6Xh5JxvjUDLE4NDnDdiKBRs49EYFYnJ", "1JZOxjNL2LjlnXZPtemsDiYCyqlSoOhtw", "1JhOmIlz-gVxkngo5InlPq5CtcyE0IIxB", "1JpSB-cKslunJaivCrq5xYmiDT71aX9S-",
    "1KX5Oznpy3aFc1veO8eUOz7K5VluQ5KX8", "1L1iiLaXK44gbq1ib9IQQr66iZMfRdXMb", "1L3VUZKLH5Tuv2rY6rS269kB_Ic8PE9Qd", "1LRejo8NowQti0sH7AABfXDW6HlaR5N0a",
    "1LV3pr9YupVghlAgx14HGyuvlnr8VQTZM", "1NCzs0qy10xQuyOGOJ3d4FvX-iVvm7-RY", "1NFIsiARl2SPhq642NxgkCJDgzW4UWtul", "1NNWXCnhJKFCIz4yUbgdag1IOCU1jD9Ds",
    "1NZw6-5mMdVG5CR8vzZrA7MBIRWSi_IwG", "1NvcoUipxOja3UnK0ml6Xb2yZdQXgKfee", "1OBOFcYnNG4hXkbQY0yAvTfnJ040mBEwz", "1P1V7SNImawxICfLi5JcDxT-Zy6NPTPI7",
    "1P76sYaobhcfNXNrMckYa2BUTJutP-v0b", "1PS1ijpZAjV0TWBbdZtrq8wZ9XNoNC7l4", "1QNdKWg4ul4_cfEPEwPFXU6MO-s3pfdVF", "1Q_KLfGDtcz9h_okMdo0DAyDENXODgh1m",
    "1Qhe9tsTofJHyvF7PHfYAAc3FFOEBLnUe", "1R0YtlIcjB-XLWO4KAyHR2ZjoZCdoRmuo", "1RBvXnMgSF-Q7FzSFdexRnwbSDSCN0tHo", "1SeOt4qHCHpYj7Kn4hrWMfi5fI9vy43DF",
    "1TADcipPexX0S2hTONckV-piZC0lw2uXH", "1TY5T-eQSq4zg6KoMOYmgY5E2r6rDB1_W", "1T_yX0yRv4lkL90Ta7WMXI1i1X4XwpvnB", "1UQ6USiqfio3q7W836nZHopO8AEl2hrq8",
    "1V5qi59s18nPFjIYgqDjLQKj0O8I8YR4D", "1V5vLL1Bxric9ZGjike2GJfHGqYoCxVJ_", "1V6QGGveSWhNzN0QxRzzoCRiyuoR2n-TL", "1VVL3rN7MURR5MzqBNIyMhXV_zp5HKA5j",
    "1VWQXYSY9rIQ6kVhkVX9Y1FeiM0iXrqXd", "1Vqt5mYaTOL5mgzTOKBj61xb92VTWIYDA", "1W2T4sGqJivG8ISjc117609zZS-gi_F5E", "1XPJVrKp5c_eGURLJU9gKomfiFpAaZ37m",
    "1XmrLWwjZf3YWd0eK7hT9p7vEpXrcCLod", "1XwgWCBxNDfEeHPKG0TiOUJURitZW4JBR", "1Y0aIMWPeZv2EfVC05_czDAni_BKeELXs", "1Y44R9Tzj9pJ64vROlz-c4gqkmAoMyNSb",
    "1YEiMcZQpHJQYbp9Cn6LTSGlMYP4BSuou", "1YPVp6KQ5TQG3whB7jnpLhz55s5D2iOmI", "1_6ymDzYnfmMlbW-vfpicZwYdSZKu0UHO", "1a7JyquDx6RVU5ukeyYmDFK1QKX7KSOBT",
    "1avA2ID-A3EJxu1xXLlS_u0r5U2BaYHik", "1bq3GxbAQvKg-i8cHPHjbYEIWPSenzzlm", "1bu0Czhv1ZUk-4sluU62h7ZFi5vlB_p_e", "1c4UVH3itK1HnpcjtvDTFypF2hsmrHTJF",
    "1c7mxeHJK5L-73bpATv4v2eX6c2bu0yIF", "1cFb_zmUP5BKHmwI6A_6i14uQFlBJE6gc", "1cdzpVO6ppKqxTipQvBK5zEFY0CPV4M1M", "1d3NyC4aGZ8fPPmNX0Ryzc1aNDL-hjBdR",
    "1d9KrHbZNs5a6y7nkyjRrirlJAgc27Zje", "1eSmzJADUCBJjZt0UafCHwUwvnJwAyrfM", "1eqBXRj4CzHS77ZDsm1jBzPf3dp39yHRB", "1fOonoxRP0wpayFpTipacHmqMsKErkfc7",
    "1gVwLllQNIu3OuAh5_06ZOy-FK1Zz21wR", "1h-uUVxKxZh92ob60zPV58k_PCLURb0dO", "1hswWpSKOv0dwdaF3Gq_3wLNaWNHdg80Q", "1hudYxi00eA2ssYgqDVm89wMl5cs5KW1F",
    "1i-brPuS5Cx-U7nhebHDCrFFtQbbkD5gf", "1iEHYHPtJmtubnMOj-r1AV-QYPFgqJwwN", "1ieMRM5xmQDe0Cm7twvSnDwhf0Po2fr0_", "1jSZ4Pvt0Qd2RJJebBcpTHnIjkyQ4KcOb",
    "1jc5LLIorQmcXhbxlGgxTkAiWar-ASlot", "1jgcNQSKFTICKv1deSU0lPRsK1Nbjp4Xv", "1jokiT0TL-w5lNJ3FMNGFmfJrCXb2i-Sg", "1jtIY_fAlO_5UiCDWVRJSi52eXWZ_K6qd",
    "1k2Vm1RbzZsvvrgUUO49wpG-RzC58RbZW", "1kTXlKiptj4kAneKrZc7uoJ9yjWOOM6BB", "1kneuNZ4hjTzmFFawTTWhekxMIeOAIVML", "1m6W47XWj5rdTSTlbKx0bCncCWOsrMkkx",
    "1mQDYzV2nPlEq-e4ec633bSRanm3bS_vy", "1mV-Yj4JJ9qGHT0XzOA5T5i2mAFSajreZ", "1mlxh135iMEjHoVlYsSfvoexhrADRmH49", "1mqI-9_xdp-Vtueh6luHFa1erRYVw54aW",
    "1mwlvoZeX3x9aU4LfdivFpjQT09RcADNd", "1n6nTsGBsplUDqkM1tFC3R4xA1Ply2i2A", "1nhisP0MOL2aTxndEELiVm9ksFxHHicg8", "1nrpQatE1bzZAW-ncSm5IJL3MNyJGA9wq",
    "1pglvNmqwClQk8OjiYgNLFlwJxQwISBJT", "1pm5Hw0czzlKZrAZBhYugfysixc-5Mkjv", "1pmgpfs-_lpZQUrlhst6qHsvTekIXVy7R", "1pxwWogBD_sDpnM80-wIyo6JhA7w3ZwkA",
    "1qD3W-tT1FPXTvq_J_EIUlTW2aVpDUIKG", "1qOLdLhK4REEpDXttD0fzYjyf6W106wwk", "1qwpKseMufmFs7mbo-YibCgPEn7GDvd6a", "1r-6b8LlNJaKO0PxTMvagVyzlbOaXSpbt",
    "1sPVzVX9q-PXSDpfj7xkPznOtAxgLQ416", "1smJ1T8mbdbrcFNIn-ClPZpYevv-965xu", "1sowMFjYilVPPGi1dfDLk_wNxUzZvXHgW", "1tJqeqG42tIWWrOxPYFiUOcB5eJcF3MA-",
    "1te3Yo-X1fm_SE1dp4zKQpUG7MKkiBi1w", "1uMGpQbVOew5NGDbYZCgCL6ljpDP7ez1K", "1uNOxv3L4OJ8rk0kfCG9AnNAe_J31_dix", "1v1qmq7qDHkdAtjHd-1DxA0By5iBEX_1Y",
    "1vv5KRYNVRnmBPm7q6D-zYsYERxt5jjtb", "1wRN7L9sct0T8nDlBzTlSV3pmD53lgNA1", "1waiwrbO2fgeBd3WRHLDvddh02tAAXtYK", "1xD71gdo0dt-_IORMagGN8doiXi-Pg8sK",
    "1xZOUvRWE2t2oram8TEh2zKS_GmupexEv", "1yCBRUktJN0UDiMMKBbR8TsotHvlpj2ck", "1yHgopUbstacM5SkRgns2LP2XpMxfO9u4", "1yVKYyRxE3wLbpt9JI0QOUyK50Rcfrohg",
  ] },
  { title: "Sports — Running", ids: [
    "18ummt1i4WJYzLeSnbIaE-lPUGAvp-COW", "19F8_3V1cwxV0Ox1rYGbRvP7hDlfQHlia", "1G77lS31IEkVkpv0aLcLMni3EJ067cnV_", "1HedmiS-H3-c4ejZGO_W1Tk7Fc1OHBWE-",
    "1VDrYjM3qi8I9wm0oiubNV-PNKZLz_NBw", "1e6zbpKT100BZqg5UUOnEXuxw2TUk4EIU",
  ] },
];

function drivePreviewUrl(id: string) {
  return `https://drive.google.com/file/d/${id}/preview`;
}

function DriveCategorySection({ category }: { category: DriveCategory }) {
  const [index, setIndex] = useState(0);
  const currentId = category.ids[index];

  return (
    <article className="surface-card overflow-hidden rounded-2xl">
      <div className="flex items-center justify-between gap-4 p-5 sm:p-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald">
            KNFT Media
          </p>
          <h3 className="mt-2 text-lg font-semibold sm:text-xl">{category.title}</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Media {index + 1} of {category.ids.length}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            aria-label={`Previous media in ${category.title}`}
            onClick={() => setIndex((value) => (value - 1 + category.ids.length) % category.ids.length)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border hover:bg-secondary"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label={`Next media in ${category.title}`}
            onClick={() => setIndex((value) => (value + 1) % category.ids.length)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border hover:bg-secondary"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="relative aspect-[9/16] max-h-[620px] w-full bg-black sm:aspect-[16/9]">
        <iframe
          key={currentId}
          src={drivePreviewUrl(currentId)}
          title={`${category.title} — media ${index + 1}`}
          className="absolute inset-0 h-full w-full border-0"
          loading="lazy"
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 p-4 sm:p-5">
        <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
          <Play className="h-4 w-4" /> Google Drive player
        </span>
        <a
          href={`https://drive.google.com/file/d/${currentId}/view`}
          target="_blank"
          rel="noreferrer"
          className="text-sm font-semibold text-primary underline-offset-4 hover:underline"
        >
          Open in Google Drive
        </a>
      </div>
    </article>
  );
}

function ProjectCard({ project }: { project: (typeof projects)[number] }) {
  return (
    <article className="surface-card group flex h-full flex-col rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald">
        {project.category}
      </p>
      <h3 className="mt-2 text-xl font-semibold leading-tight">{project.title}</h3>
      <p className="mt-3 inline-flex items-center gap-1.5 text-sm text-muted-foreground">
        <MapPin className="h-4 w-4" aria-hidden />
        {project.location}
      </p>

      {project.highlights?.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-2">
          {project.highlights.map((highlight) => (
            <li key={highlight} className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
              {highlight}
            </li>
          ))}
        </ul>
      )}

      <p className="mt-4 line-clamp-3 text-sm leading-6 text-muted-foreground">
        {project.overview}
      </p>

      <div className="mt-auto pt-6">
        <BtnLink to="/projects/$slug" params={{ slug: project.slug }} variant="outline" size="sm">
          View Project
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </BtnLink>
      </div>
    </article>
  );
}

export const Route = createFileRoute("/projects/")({
  head: () => ({
    meta: [
      { title: "Projects — Kalam Nation First Trust" },
      {
        name: "description",
        content:
          "Explore Kalam Nation First Trust projects and community initiatives across water restoration, disaster relief, blood donation, education, career support, tree plantation and sports.",
      },
      { property: "og:title", content: "KNFT Projects — Kalam Nation First Trust" },
      { property: "og:description", content: "Explore KNFT projects and community initiatives." },
    ],
  }),
  component: ProjectsIndex,
});

function ProjectsIndex() {
  return (
    <>
      <PageHero
        eyebrow="Projects"
        title="Work that changes landscapes and lives"
        subtitle="Explore KNFT projects and watch photos and videos directly from their category-specific Google Drive folders."
      />

      <Section>
        <SectionHeading
          title="All projects"
          subtitle="Project descriptions and details, without local image or video assets."
        />
        <Stagger className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <StaggerItem key={project.slug}>
              <ProjectCard project={project} />
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <Section tone="muted">
        <SectionHeading
          title="Media by category"
          subtitle="Use the arrows on each player to browse the Google Drive files assigned to that category. Media from different categories is kept separate."
        />
        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          {driveCategories.map((category) => (
            <DriveCategorySection key={category.title} category={category} />
          ))}
        </div>
      </Section>
    </>
  );
}
